// EspoCRM Automation Workflows for QuickFix Services
// Copy these configurations into EspoCRM Administration > Workflows

const workflows = {
  leadAssignment: {
    name: "QuickFix Lead Auto-Assignment",
    entityType: "Lead",
    triggerType: "afterRecordCreated",
    conditions: {
      source: "website"
    },
    actions: [
      {
        type: "updateEntity",
        assignedUserId: "1"
      },
      {
        type: "createTask",
        name: "Follow up: {name}",
        description: "Contact customer about {serviceType} service",
        priority: "High",
        dateStart: "now",
        dateEnd: "now+1hour"
      }
    ]
  },

  emergencyAlert: {
    name: "Emergency Lead Priority",
    entityType: "Lead", 
    triggerType: "afterRecordCreated",
    conditions: {
      or: [
        { urgencyLevel: "emergency" },
        { leadScore: { gte: 90 } }
      ]
    },
    actions: [
      {
        type: "sendEmail",
        to: "manager@quickfixservices.com",
        subject: "URGENT: Emergency Service Request",
        body: "Emergency lead: {name} - {phoneNumber}"
      }
    ]
  }
};

module.exports = workflows;
