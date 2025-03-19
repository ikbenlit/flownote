'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { TaskList } from '@/components/TaskList';
import { TaskGroupCard } from '@/components/TaskGroupCard';
import { Task, TaskGroup, TaskFilterCriteria } from '@/types/tasks';
import { useTask } from '@/context/TaskContext';
import { useAuth } from '@/context/AuthContext';
import { FaPlus } from 'react-icons/fa';

export default function TasksPage() {
  const { t } = useI18n();
  const { currentUser } = useAuth();
  const { taskGroups, addTaskGroup, getTasksByGroupId, getGroupStats } = useTask();
  const [filter, setFilter] = useState<TaskFilterCriteria>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#3B82F6');

  const handleAddGroup = async () => {
    if (!newGroupName.trim() || !currentUser) return;

    try {
      await addTaskGroup({
        name: newGroupName.trim(),
        color: newGroupColor,
        userId: currentUser.uid,
      });
      setNewGroupName('');
      setShowAddGroup(false);
    } catch (error) {
      console.error('Fout bij het toevoegen van groep:', error);
    }
  };

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
            {t('tasks.title')}
          </h1>
          <button
            onClick={() => setShowAddGroup(!showAddGroup)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            {t('tasks.add_group')}
          </button>
        </div>

        {showAddGroup && (
          <div className="mb-6 p-4 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm">
            <div className="flex gap-4">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder={t('tasks.group_name_placeholder')}
                className="flex-1 px-3 py-2 bg-white dark:bg-dark-bg-primary border border-gray-300 dark:border-dark-border-primary rounded-lg shadow-sm text-sm"
              />
              <input
                type="color"
                value={newGroupColor}
                onChange={(e) => setNewGroupColor(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer"
              />
              <button
                onClick={handleAddGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('tasks.add')}
              </button>
              <button
                onClick={() => setShowAddGroup(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <select
            value={filter.status || ''}
            onChange={(e) => setFilter(prev => ({
              ...prev,
              status: e.target.value as Task['status'] || undefined
            }))}
            className="px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border-primary rounded-lg shadow-sm text-sm"
          >
            <option value="">{t('tasks.filter.all_statuses')}</option>
            <option value="todo">{t('tasks.status.todo')}</option>
            <option value="in_progress">{t('tasks.status.in_progress')}</option>
            <option value="done">{t('tasks.status.done')}</option>
          </select>

          <select
            value={filter.priority || ''}
            onChange={(e) => setFilter(prev => ({
              ...prev,
              priority: e.target.value as Task['priority'] || undefined
            }))}
            className="px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border-primary rounded-lg shadow-sm text-sm"
          >
            <option value="">{t('tasks.filter.all_priorities')}</option>
            <option value="low">{t('tasks.priority.low')}</option>
            <option value="medium">{t('tasks.priority.medium')}</option>
            <option value="high">{t('tasks.priority.high')}</option>
          </select>

          <select
            value={filter.groupId || ''}
            onChange={(e) => setFilter(prev => ({
              ...prev,
              groupId: e.target.value || undefined
            }))}
            className="px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border-primary rounded-lg shadow-sm text-sm"
          >
            <option value="">{t('tasks.filter.all_groups')}</option>
            {taskGroups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder={t('tasks.filter.search')}
            value={filter.search || ''}
            onChange={(e) => setFilter(prev => ({
              ...prev,
              search: e.target.value
            }))}
            className="px-3 py-2 bg-white dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border-primary rounded-lg shadow-sm text-sm"
          />

          {(filter.status || filter.priority || filter.groupId || filter.search) && (
            <button
              onClick={() => setFilter({})}
              className="px-3 py-2 text-sm text-blue-600 dark:text-dark-accent-blue hover:text-blue-800 dark:hover:text-dark-accent-blue-light"
            >
              {t('tasks.filter.clear')}
            </button>
          )}
        </div>
      </div>

      {/* Task Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {taskGroups.map(group => {
          const groupTasks = getTasksByGroupId(group.id);
          const stats = getGroupStats(group.id);
          
          return (
            <div 
              key={group.id}
              className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              style={{ borderTop: `4px solid ${group.color || '#3B82F6'}` }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
                    {group.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-dark-text-secondary">
                    {groupTasks.length} {t('tasks.items')}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 dark:bg-dark-bg-primary rounded-full mb-3">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ 
                      width: `${stats.completionPercentage}%`,
                      backgroundColor: group.color || '#3B82F6'
                    }}
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                  <div className="text-center">
                    <div className="font-medium text-gray-900 dark:text-dark-text-primary">{stats.todo}</div>
                    <div className="text-gray-500 dark:text-dark-text-secondary">{t('tasks.status.todo')}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 dark:text-dark-text-primary">{stats.inProgress}</div>
                    <div className="text-gray-500 dark:text-dark-text-secondary">{t('tasks.status.in_progress')}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 dark:text-dark-text-primary">{stats.completed}</div>
                    <div className="text-gray-500 dark:text-dark-text-secondary">{t('tasks.status.done')}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary"
                  >
                    {expandedGroups.has(group.id) ? t('common.collapse') : t('common.expand')}
                  </button>
                </div>
              </div>

              {/* Expanded Tasks List */}
              {expandedGroups.has(group.id) && (
                <div className="border-t border-gray-200 dark:border-dark-border-primary">
                  <TaskList filter={{ ...filter, groupId: group.id } as TaskFilterCriteria} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ungrouped Tasks */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text-primary mb-4">
          {t('tasks.ungrouped')}
        </h2>
        <TaskList filter={{ ...filter, groupId: undefined } as TaskFilterCriteria} />
      </div>
    </div>
  );
} 