/**
 * 格式化日期（MM月DD日）
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return parts[1] + '月' + parts[2] + '日';
}

/**
 * 格式化日期（YYYY年MM月DD日）
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {string}
 */
function formatDateFull(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return parts[0] + '年' + parts[1] + '月' + parts[2] + '日';
}

/**
 * 获取星期几
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {string}
 */
function getDayOfWeek(dateStr) {
  var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  var date = new Date(dateStr);
  return days[date.getDay()];
}

/**
 * 获取今天的日期字符串（YYYY-MM-DD）
 * @returns {string}
 */
function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

/**
 * 计算进度百分比（0-100）
 * @param {number} used
 * @param {number} total
 * @returns {number}
 */
function calcProgress(used, total) {
  if (!total || total === 0) return 0;
  return Math.min(100, Math.round((used / total) * 100));
}

/**
 * 获取课程难度对应的CSS类名
 * @param {string} difficulty
 * @returns {string}
 */
function getDifficultyClass(difficulty) {
  var map = {
    '初级': 'tag-beginner',
    '中级': 'tag-intermediate',
    '高级': 'tag-advanced'
  };
  return map[difficulty] || 'tag-beginner';
}

/**
 * 获取课程状态对应的CSS类名
 * @param {string} status
 * @returns {string}
 */
function getStatusClass(status) {
  var map = {
    '待上课': 'tag-pending',
    '已完成': 'tag-completed',
    '已取消': 'tag-cancelled'
  };
  return map[status] || 'tag-pending';
}

module.exports = {
  formatDate: formatDate,
  formatDateFull: formatDateFull,
  getDayOfWeek: getDayOfWeek,
  getTodayStr: getTodayStr,
  calcProgress: calcProgress,
  getDifficultyClass: getDifficultyClass,
  getStatusClass: getStatusClass
};
