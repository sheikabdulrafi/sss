const letterTypes = {
  showCause: 'Show Cause Notice',
  firstWarning: 'First Warning Letter',
  secondWarning: 'Second Warning Letter',
  finalWarning: 'Final Warning Letter',
  termination: 'Termination Letter'
};

const getLetterContent = ({ employee, type, reason }) => {
  const title = letterTypes[type] || 'Official Letter';
  const today = new Date().toLocaleDateString('en-IN');

  return {
    title,
    body: `Date: ${today}\n\nTo,\n${employee.employeeName}\n${employee.designation || ''}\nEmployee No: ${employee.employeeNumber}\n\nSubject: ${title}\n\nDear ${employee.employeeName},\n\nThis is to inform you that ${reason}. You are expected to provide your clarification and ensure compliance with company policy immediately.\n\nPlease treat this as an official communication from Staffex Staffing Solutions.\n\nSincerely,\nHR Department\nStaffex Staffing Solutions`
  };
};

module.exports = { getLetterContent, letterTypes };
