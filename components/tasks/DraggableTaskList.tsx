'use client'

import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { AnimatePresence } from 'framer-motion'
import { TaskCard } from './TaskCard'
import { TaskFiltersBar } from './TaskFilters'
import { EmptyState } from './EmptyState'
import type { Task, TaskFilters } from '@/lib/types'

interface DraggableTaskListProps {
  initialTasks: Task[]
}

const DEFAULT_FILTERS: TaskFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  category: 'all',
}

export function DraggableTaskList({ initialTasks }: DraggableTaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS)

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  const filteredTasks = tasks.filter((task) => {
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !task.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.status !== 'all' && task.status !== filters.status) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.category !== 'all' && task.category !== filters.category) return false
    return true
  })

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return
    const items = Array.from(filteredTasks)
    const [removed] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, removed)
    // Update the full tasks array maintaining relative order
    const filteredIds = new Set(items.map((t) => t.id))
    const unfilteredTasks = tasks.filter((t) => !filteredIds.has(t.id))
    setTasks([...items, ...unfilteredTasks])
  }

  return (
    <div className="space-y-4">
      <TaskFiltersBar
        filters={filters}
        onChange={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      {filteredTasks.length === 0 ? (
        <EmptyState hasFilters={Object.values(filters).some((v) => v !== 'all' && v !== '')} />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2"
              >
                <AnimatePresence mode="popLayout">
                  {filteredTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...(provided.draggableProps as React.HTMLAttributes<HTMLDivElement>)}
                        >
                          <TaskCard
                            task={task}
                            dragHandleProps={provided.dragHandleProps as unknown as Record<string, unknown>}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
