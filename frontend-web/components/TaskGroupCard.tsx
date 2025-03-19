'use client'

import React from 'react'
import { TaskGroup, Task, TaskStats } from '@/types/tasks'
import { useI18n } from '@/context/I18nContext'
import { CircularProgress } from './CircularProgress'

interface TaskGroupCardProps {
  group: TaskGroup
  tasks: Task[]
  stats: TaskStats
  onToggle: () => void
  isExpanded: boolean
}

export const TaskGroupCard: React.FC<TaskGroupCardProps> = ({
  group,
  tasks,
  stats,
  onToggle,
  isExpanded
}) => {
  const { t } = useI18n()

  return (
    <div 
      className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm overflow-hidden"
      style={{ borderLeft: `4px solid ${group.color || '#CBD5E0'}` }}
    >
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-bg-hover transition-colors"
      >
        <div className="flex items-center space-x-3">
          <CircularProgress 
            percentage={stats.completionPercentage} 
            size={32}
            color={group.color}
          />
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
              {group.name}
            </h2>
            {group.description && (
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                {group.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-dark-text-secondary">
            {stats.completed}/{stats.total} {t('tasks.completed')}
          </div>
          <div className="flex space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
              {stats.todo}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">
              {stats.inProgress}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
              {stats.completed}
            </span>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="p-3 bg-gray-50 dark:bg-dark-bg-hover rounded-lg mb-2 last:mb-0"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-900 dark:text-dark-text-primary">
                  {task.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : task.priority === 'medium'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {t(`tasks.priority.${task.priority}`)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                    task.status === 'todo'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : task.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {t(`tasks.status.${task.status}`)}
                  </span>
                </div>
              </div>
              {task.deadline && (
                <div className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">
                  {t('tasks.deadline')}: {new Date(task.deadline).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 