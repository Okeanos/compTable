compTableStructure = [
	{
		title: "Fundamentals",
		id: "fundamentals",
		rows: [
			{id: "underlyingFormalism", name: "Underlying Formalism", title: "Does the language have a formal model governing its representation and functions?"},
			{id: "consistency", name: "Consistency", title: "Is policy consistency enforced/checked and are conflicts in policies resolved?"},
			{id: "individualControl", name: "Individual Control", title: "How well can the language express privacy preferences and privacy policies in general?"}
		]
	},
	{
		title: "Technical Basics",
		id: "technicalBasics",
		rows: [
			{id: "representation", name: "Representation", title: "How are policies encoded, stored and represented?"},
			{id: "requestFormat", name: "Request Format", title: "How are requests made and what parameters are necessary?"},
			{id: "monotonicity", name: "Monotonicity", title: "Is the language monotone, i.e. more information given in a request always results in more access being granted?"},
			{id: "policyEvaluation", name: "Policy Evaluation", title: "How is a request evaluated against a policy?"},
			{id: "resultFormat", name: "Result Format", title: "How and what results are returned after evaluation?"},
			{id: "extensibility", name: "Extensibility", title: "Can the language definitions and functionality be extended in some way?"}
		]
	},
	{
		title: "Obligations and Disclosure Limitations",
		id: "obligationsDisclosureLimitations",
		rows: [
			{id: "obligations", name: "Obligations", title: "Can obligations, e.g. send a notification to the user if his information is accessed, be created?"},
			{id: "disclosureLimitations", name: "Disclosure Limitations", title: "Can disclosed information be limited in some way, e.g. by obfuscation?"},
			{id: "sensitiveAssociations", name: "Sensitive Associations", title: "Can data sets put into relationships so that mutually exclusive release statements or other constructs are possible?"},
			{id: "delegation", name: "Delegation", title: "Can privileges and permissions delegated to other users in the system?"}
		]
	},
	{
		title: "Context-Awareness",
		id: "contextAwareness",
		rows: [
			{id: "location", name: "Location", title: "How does the language support location data?"},
			{id: "identity", name: "Identity", title: "Can the language handle identities, authentication, and related data structures and information?"},
			{id: "activity", name: "Activity", title: "Are rules concerning actual activities such as playing football possible?"},
			{id: "time", name: "Time", title: "Are conditions with temporal applicability possible? What abut absolute rule lifetimes?"}
		]
	},
	{
		title: "Negotiation and Policy Nesting",
		id: "negotiationPolicyNesting",
		rows: [
			{id: "negotiation", name: "Negotiation", title: "Can multiple instances of the system negotiate joint policies from multiple sets?"},
			{id: "externalPolicies", name: "External Policies", title: "How are requests to external policy files handled if at all possible?"},
			{id: "sensitivePolicies", name: "Sensitive Policies", title: "What about policies that may not be published? Can their contents be protected while in transfer?"},
			{id: "representation", name: "Policy Nesting", title: "Can policies be nested to create larger, more complex policies out of individual files?"}
		]
	}
];