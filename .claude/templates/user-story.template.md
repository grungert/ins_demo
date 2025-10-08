## User‑Story Template & Guidelines

### Title

```
<COMPONENT> | <SCOPE> | <Short description>
```

* **COMPONENT** ∈ { FE, BE, DevOps }
* **SCOPE** ∈ { UI Components, Mocked Integration, Integration, Environment }

#### Scope Definitions

* **UI Components**: Build visuals only (no business logic)
* **Mocked Integration**: Implement local logic (Zustand state, mock API endpoints) per low-level design
* **Integration**: Wire UI to real backend data (may include small UI component work if scoped appropriately)

> **Story size target**: Each story should be feasible in **MAX 1–1.5 developer days OR LESS**.

> **Estimate note**: At the bottom of each story, include a brief time estimate (e.g. "Estimated effort: 1d").

### Narrative

```
As a <user_type>
I want <goal>
so that <benefit>
```

### Description

* **What** we deliver
* **Why** it matters (business value)
* (Optional) AS-IS vs. TO-BE process

### Assumptions

List out-of-scope items or prerequisites.

### Acceptance Criteria

* Give each AC a short descriptive title
* Follow **GIVEN / WHEN / THEN**
* Include NFRs if applicable
* Reference screenshots or Figma links if available
* Use parameters for permutations (e.g. `<user_type> ∈ {admin, viewer}`)
* Ensure the acceptance criteria cover the existence of all visual elements shown in the design (e.g., menu items names, grid column names should be listed)
* Never use technical terms in ACs: all criteria should be user-centric, describing observable behavior, understandable by both technical and non-technical stakeholders (developers, PMs, QA, product owners, etc.)
* Make sure each AC makes it straightforward for QA team to create test cases from it
* Make sure the set of ACs is collectively exhaustive: anything that is not mentioned in ACs will not be implemented
* Concise, human readable, not too wordy, no list formatting

### Permutations

After ACs, detail parameter values (e.g. roles, asset types).


### Non-Functional Requirements

Add explicit NFRs for each story when relevant:

* **Performance:** e.g. load < 2s for primary screens under standard conditions
* **Accessibility:** WCAG 2.1 AA compliance for new UI components
* **Security:** follow OWASP Top 10 guidance for any API endpoints
* **Scalability:** support up to N concurrent users for feature X
* **Localization:** i18n for only English language for now
* **Observability:** include logging/tracing hooks as defined in low-level design

Each NFR should be included in the ACs or as a checklist under this section.


### Resources

* List links to used documents, best practice guides, Figma designs, or other resources that can help the developer understand the context and requirements.
