export default {
  system: {
    perms: {
      module: true,
    },
    sub: {
      user: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      role: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      organization: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      message: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      dictionary: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      monitor: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      operationRecord: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  team: {
    perms: {
      module: true,
    },
    sub: {
      teamManagement: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      teamSchedule: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      taskHandover: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  customerInformation: {
    perms: {
      module: true,
    },
    sub: {
      customer: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      number: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      asset: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      powerStation: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      contract: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      report: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  business: {
    perms: {
      module: true,
    },
    sub: {
      materiel: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      task: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      order: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  inspection: {
    perms: {
      module: true,
    },
    sub: {
      inspectionPlan: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      inspectionTask: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      inspectionRecord: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      defect: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  alarm: {
    perms: {
      module: true,
    },
    sub: {
      alarmTemplate: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      monitorEquipment: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      alarmRecord: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  achievements: {
    perms: {
      module: true,
    },
    sub: {
      assessmentEvaluate: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      assessmentConfig: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  customerService: {
    perms: {
      module: true,
    },
    sub: {
      onlineCustomerService: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      returnVisit: {
        perms: {
          module: true,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
  newsAndKnowledge: {
    perms: {
      module: true,
    },
    sub: {
      newsAndKnowledgePoint: {
        perms: {
          module: false,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
      knowledgeBase: {
        perms: {
          module: false,
          describe: true,
          create: true,
          edit: true,
          delete: true,
        },
        sub: {},
      },
    },
  },
};
