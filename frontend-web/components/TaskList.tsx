'use client'

import React, { useState, useMemo } from 'react'
import { useTask } from '../context/TaskContext'
import { useI18n } from '../context/I18nContext'
import { Task } from '@/types/tasks'
import { FaChevronDown, FaChevronRight, FaCheck, FaClock, FaSpinner } from 'react-icons/fa'

interface TaskListProps {
  filter?: {
    status?: Task['status']
    priority?: Task['priority']
    noteId?: string
  }
}

export const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const { tasks, loading, error, updateTask, debugInfo } = useTask()
  const { t } = useI18n()
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set())

  // Filter taken op basis van de filter props
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter?.status && task.status !== filter.status) return false
      if (filter?.priority && task.priority !== filter.priority) return false
      if (filter?.noteId && task.sourceNoteId !== filter.noteId) return false
      return true
    })
  }, [tasks, filter])

  // Groepeer taken per notitie
  const tasksByNote = useMemo(() => {
    const grouped = filteredTasks.reduce((acc, task) => {
      if (!acc[task.sourceNoteId]) {
        acc[task.sourceNoteId] = {
          noteTitle: task.sourceNoteTitle,
          tasks: []
        }
      }
      acc[task.sourceNoteId].tasks.push(task)
      return acc
    }, {} as Record<string, { noteTitle: string; tasks: Task[] }>)
    return grouped
  }, [filteredTasks])

  // Status update handler
  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    await updateTask(taskId, { status: newStatus })
  }

  // Priority update handler
  const handlePriorityChange = async (taskId: string, newPriority: Task['priority']) => {
    await updateTask(taskId, { priority: newPriority })
  }

  // Toggle notitie uitklappen
  const toggleNote = (noteId: string) => {
    const newExpanded = new Set(expandedNotes)
    if (newExpanded.has(noteId)) {
      newExpanded.delete(noteId)
    } else {
      newExpanded.add(noteId)
    }
    setExpandedNotes(newExpanded)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-500 dark:text-dark-accent-blue" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
        
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {showDebug ? 'Verberg debug info' : 'Toon debug info'}
        </button>

        {showDebug && debugInfo && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
            <h3 className="font-medium mb-2">Debug Informatie:</h3>
            
            {debugInfo.authState && (
              <div className="mb-2">
                <p>Authenticatie Status:</p>
                <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  {JSON.stringify(debugInfo.authState, null, 2)}
                </pre>
              </div>
            )}

            {debugInfo.lastError && (
              <div className="mb-2">
                <p>Laatste Fout:</p>
                <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  {JSON.stringify(debugInfo.lastError, null, 2)}
                </pre>
              </div>
            )}

            {debugInfo.queryState && (
              <div>
                <p>Query Status:</p>
                <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  {JSON.stringify(debugInfo.queryState, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-dark-text-secondary">
        {t('tasks.no_tasks')}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {Object.entries(tasksByNote).map(([noteId, { noteTitle, tasks }]) => (
        <div key={noteId} className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm">
          <button
            onClick={() => toggleNote(noteId)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-bg-hover rounded-t-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              {expandedNotes.has(noteId) ? (
                <FaChevronDown className="text-gray-400" />
              ) : (
                <FaChevronRight className="text-gray-400" />
              )}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
                {noteTitle}
              </h2>
            </div>
            <span className="text-sm text-gray-500 dark:text-dark-text-secondary">
              {tasks.length} {tasks.length === 1 ? t('tasks.task') : t('tasks.tasks')}
            </span>
          </button>

          {expandedNotes.has(noteId) && (
            <div className="px-4 pb-4 space-y-3">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 bg-gray-50 dark:bg-dark-bg-hover rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-active transition-colors"
                  onMouseEnter={() => setHoveredTask(task.id)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 pt-1">
                      <button
                        onClick={() => handleStatusChange(task.id, task.status === 'done' ? 'todo' : 'done')}
                        className={`p-1 rounded-full transition-colors ${
                          task.status === 'done'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                        }`}
                      >
                        <FaCheck className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-medium ${
                        task.status === 'done'
                          ? 'text-gray-500 line-through dark:text-dark-text-secondary'
                          : 'text-gray-900 dark:text-dark-text-primary'
                      }`}>
                        {task.title}
                      </h3>
                      
                      <div className="mt-1 flex items-center gap-2 text-sm">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : task.priority === 'medium'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {t(`tasks.priority.${task.priority}`)}
                        </span>
                        
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${
                          task.status === 'todo'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : task.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {t(`tasks.status.${task.status}`)}
                        </span>

                        {task.deadline && (
                          <span className="inline-flex items-center text-gray-500 dark:text-dark-text-secondary">
                            <FaClock className="w-3 h-3 mr-1" />
                            {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {hoveredTask === task.id && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-secondary p-2 rounded">
                      <p className="whitespace-pre-wrap">{task.extractedText}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 