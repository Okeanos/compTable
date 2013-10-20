compTableStructure = [
	{
		title: "Fundamentals",
		id: "fundamentals",
		attr: {
			"class": "first-Table"
		},
		rows: [
			{ name: "Underlying Formalism",
			  trAttr: {
			  	"class": "underlyingFormalism"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Does the language have a formal model governing its representation and functions?"
			  }
			},
			{ name: "Consistency",
			  trAttr: {
			  	"class": "consistency"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Is policy consistency enforced/checked and are conflicts in policies resolved?"
			  }
			},
			{ name: "Individual Control",
			  trAttr: {
			  	"class": "individualControl"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "How well can the language express privacy preferences and privacy policies in general?"
			  }
			}
		]
	},
	{
		title: "Technical Basics",
		id: "technicalBasics",
		rows: [
			{ name: "Representation",
			  trAttr: {
			  	"class": "representation"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "How are policies encoded, stored and represented?"
			  }
			},
			{ name: "Request Format",
			  trAttr: {
			  	"class": "requestFormat"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "How are requests made and what parameters are necessary?"
			  }
			},
			{ name: "Monotonicity",
			  trAttr: {
			  	"class": "monotonicity"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Is the language monotone, i.e. more information given in a request always results in more access being granted?"
			  }
			},
			{ name: "Policy Evaluation",
			  trAttr: {
			  	"class": "policyEvaluation"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "How is a request evaluated against a policy?"
			  }
			},
			{ name: "Result Format",
			  trAttr: {
			  	"class": "resultFormat"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "How and what results are returned after evaluation?"
			  }
			},
			{ name: "Extensibility",
			  trAttr: {
			  	"class": "extensibility"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can the language definitions and functionality be extended in some way?"
			  }
			}
		]
	},
	{
		title: "Obligations and Disclosure Limitations",
		id: "obligationsDisclosureLimitations",
		rows: [
			{ name: "Obligations",
			  trAttr: {
			  	"class": "obligations"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can obligations, e.g. send a notification to the user if his information is accessed, be created?"
			  }
			},
			{ name: "Disclosure Limitations",
			  trAttr: {
			  	"class": "disclosureLimitations"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can disclosed information be limited in some way, e.g. by obfuscation?"
			  }
			},
			{ name: "Sensitive Associations",
			  trAttr: {
			  	"class": "sensitiveAssociations"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can data sets put into relationships so that mutually exclusive release statements or other constructs are possible?"
			  }
			},
			{ name: "Delegation",
			  trAttr: {
			  	"class": "delegation"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can privileges and permissions delegated to other users in the system?"
			  }
			}
		]
	},
	{
		title: "Context-Awareness",
		id: "contextAwareness",
		rows: [
			{ name: "Location",
			  trAttr: {
			  	"class": "location"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "How does the language support location data?"
			  }
			},
			{ name: "Identity",
			  trAttr: {
			  	"class": "identity"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can the language handle identities, authentication, and related data structures and information?"
			  }
			},
			{ name: "Activity",
			  trAttr: {
			  	"class": "activity"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Are rules concerning actual activities such as playing football possible?"
			  }
			},
			{ name: "Time",
			  trAttr: {
			  	"class": "time"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Are conditions with temporal applicability possible? What abut absolute rule lifetimes?"
			  }
			}
		]
	},
	{
		title: "Negotiation and Policy Nesting",
		id: "negotiationPolicyNesting",
		rows: [
			{ name: "Negotiation",
			  trAttr: {
			  	"class": "negotiation"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can multiple instances of the system negotiate joint policies from multiple sets?"
			  }
			},
			{ name: "External Policies",
			  trAttr: {
			  	"class": "externalPolicies"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "How are requests to external policy files handled if at all possible?"
			  }
			},
			{ name: "Sensitive Policies",
			  trAttr: {
			  	"class": "sensitivePolicies"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "What about policies that may not be published? Can their contents be protected while in transfer?"
			  }
			},
			{ name: "Policy Nesting",
			  trAttr: {
			  	"class": "policyNesting"
			  },
			  thAttr: {
			  	"data-toggle": "tooltip",
			  	"data-original-title": "Can policies be nested to create larger, more complex policies out of individual files?"
			  }
			}
		]
	}
];