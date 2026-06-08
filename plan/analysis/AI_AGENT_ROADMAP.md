---
categories:
  - "[[Projects]]"
  - "[[Blueprint]]"
  - "[[Blueprint Analysis]]"
type: ["[[Course Analysis]]"]
org: ["[[Blueprint]]"]
start: 2026-06-02
year: 2026
url: https://blueprint.vn
status: "[[Planned]]"
---

# 🤖 AI Agent Mastery Roadmap: From No-Code to Engineer

This roadmap provides a structured path to mastering AI Agents, synthesizing global industry standards (HuggingFace, Microsoft, Google, DeepLearning.AI) and practical market applications.

---

## 🗺️ Roadmap Overview

The journey is divided into 5 progressive levels. Each level builds upon the previous one, moving from **consuming AI** $\rightarrow$ **orchestrating AI** $\rightarrow$ **engineering AI**.

| Level                         | Focus        | Primary Skill | Primary Toolset            | Outcome                    |
| :---------------------------- | :----------- | :------------ | :------------------------- | :------------------------- |
| **L1: No-Code Explorer**      | Consumption  | Prompting     | GPTs, Claude, NotebookLM   | AI-First Productivity      |
| **L2: Low-Code Builder**      | Automation   | Workflows     | n8n, Make, Zapier          | Automated Business Process |
| **L3: Core Agent Engineer**   | Logic        | Tool-Use      | Python, LangChain, RAG     | Autonomous Single Agents   |
| **L4: Advanced Orchestrator** | Coordination | State Mgmt    | LangGraph, CrewAI          | Multi-Agent Teams          |
| **L5: Production Expert**     | Scale        | Reliability   | Docker, Azure/Vertex, Eval | Enterprise-Grade AI SaaS   |

---

## 🟢 Level 1: No-Code Explorer

**Goal:** Transition from "chatting" to "building" using existing platforms.

### 📚 Key Concepts

- **The Agent Mindset:** Understanding the difference between a _Chatbot_ (Conversational) and an _Agent_ (Goal-oriented + Action-capable).
- **Advanced Prompting:**
  - **Role Prompting:** Assigning a specific persona.
  - **Few-Shot Prompting:** Providing examples to guide output.
  - **Chain-of-Thought (CoT):** Forcing the AI to "think step-by-step."
- **Context Windows:** Understanding how much information the AI can "remember" in one session.

### 🛠️ Toolset

- **Custom Assistants:** OpenAI GPTs, Claude Projects.
- **Research Tools:** Perplexity, NotebookLM (for source-grounded analysis).
- **IDE Assistants:** Cursor, v0.dev, Bolt.new (Initial "Vibe Coding").

### 🚀 Project: "The Personal Knowledge Brain"

Build a custom GPT/Claude Project that acts as a specialized mentor for a specific domain (e.g., Legal Assistant, Coding Coach) using a curated set of uploaded knowledge files.

---

## 🟡 Level 2: Low-Code Builder

**Goal:** Connect AI to the internet and external apps to perform real-world tasks.

### 📚 Key Concepts

- **Workflow Logic:** Triggers $\rightarrow$ Actions $\rightarrow$ Filters $\rightarrow$ Notifications.
- **API Fundamentals:**
  - **REST APIs:** How apps talk to each other.
  - **Webhooks:** How apps tell your workflow "something happened" in real-time.
  - **JSON:** The universal language of data exchange.
- **Basic RAG (Retrieval Augmented Generation):** Connecting a chatbot to a PDF or a Website so it doesn't hallucinate.
- **Data Scraping:** Extracting information from the web without manual copy-pasting.

### 🛠️ Toolset

- **Orchestration:** **n8n** (Recommended for power), Make.com, Zapier.
- **Database:** Google Sheets, Airtable (as a lightweight DB).
- **Scraping:** Browserless, Apify, Firecrawl.

### 🚀 Project: "The Automated Lead Machine"

Build an n8n workflow that:

1. Scrapes a specific industry website for new leads.
2. Uses AI to categorize the lead and write a personalized intro email.
3. Saves the lead to Google Sheets and sends a notification to Slack.

---

## 🟠 Level 3: Core Agent Engineer

**Goal:** Move from "linear workflows" to "autonomous loops" using code.

### 📚 Key Concepts

- **The Agentic Loop:** **Think $\rightarrow$ Act $\rightarrow$ Observe** (The ReAct Pattern).
- **Function Calling:** Teaching an LLM how to call a Python function to get real-time data (e.g., `get_weather()`, `query_database()`).
- **Advanced RAG Pipeline:**
  - **Chunking:** How to split documents for better retrieval.
  - **Embeddings:** Converting text to math (vectors).
  - **Vector DBs:** Pinecone, Milvus, ChromaDB.
  - **Re-ranking:** Filtering the most relevant results before giving them to the LLM.
- **Memory Architectures:**
  - **Short-term:** Session history.
  - **Long-term:** Storing user preferences across days/weeks.

### 🛠️ Toolset

- **Language:** Python (Pandas, NumPy).
- **Frameworks:** **LangChain**, **LlamaIndex**, **smolagents**.
- **LLMs:** GPT-4o, Claude 3.5 Sonnet, Llama 3 (Local via Ollama).

### 🚀 Project: "The Autonomous Research Agent"

Build a Python agent that:

1. Takes a complex research topic.
2. Searches the web for 5-10 sources.
3. Critically analyzes the contradictions between sources.
4. Writes a final structured report in Markdown.

---

## 🔴 Level 4: Advanced Orchestrator

**Goal:** Build "Digital Departments" where multiple agents collaborate.

### 📚 Key Concepts

- **Multi-Agent Topologies:**
  - **Sequential:** Agent A $\rightarrow$ Agent B $\rightarrow$ Agent C.
  - **Hierarchical:** Manager Agent $\rightarrow$ Worker Agents.
  - **Joint Collaboration:** Agents debating a topic to find the best answer.
- **State Management:** Using a "Shared State" (Graph) so agents know what others have already done.
- **Human-in-the-Loop (HITL):** Designing "Checkpoints" where the agent must ask a human for approval before taking a critical action.
- **Protocols:** **MCP (Model Context Protocol)** for standardized tool connection.

### 🛠️ Toolset

- **Orchestration:** **LangGraph** (For complex state/cycles), **CrewAI** (For role-based teams).
- **Evaluation:** RAGAS, LangSmith (For tracing and debugging).

### 🚀 Project: "The AI Software Agency"

Create a team of 3 agents using CrewAI/LangGraph:

1. **Product Manager:** Breaks the user request into a technical spec.
2. **Developer:** Writes the Python code.
3. **QA Engineer:** Tests the code and sends it back to the Developer if it fails.

---

## 🟣 Level 5: Production Expert

**Goal:** Transform a "demo" into a scalable, secure, and reliable product.

### 📚 Key Concepts

- **Deployment:** Wrapping agents in **FastAPI**, containerizing with **Docker**, and deploying to Cloud (AWS/Azure/GCP).
- **Agent Evaluation (Eval):**
  - **LLM-as-a-Judge:** Using a stronger model to grade a smaller model.
  - **Golden Datasets:** A set of ideal question-answer examples to test against.
- **Observability:** Implementing tracing to see exactly where an agent got lost in a loop.
- **Guardrails:** Using **Llama Guard** or NeMo Guardrails to prevent toxic or off-topic responses.
- **Optimization:** Prompt caching, KV cache, and model quantization for lower cost and higher speed.

### 🛠️ Toolset

- **Infrastructure:** Docker, Kubernetes, Terraform.
- **Monitoring:** MLflow, LangSmith, Arize Phoenix.
- **Cloud:** Azure AI Foundry, Google Vertex AI Agent Engine.

### 🚀 Project: "The Enterprise AI SaaS"

Build and deploy a production-ready Agent API that:

1. Handles multiple concurrent users with isolated memory.
2. Includes a monitoring [[web/page/student/dashboard|dashboard]] for latency and token cost.
3. Has a "Safety Layer" that blocks prompt injections.
4. Is deployed via a CI/CD pipeline.

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/course
- #blueprint/plan

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]]

### Relations
- **Outgoing Links:** [[web/page/student/dashboard|/dashboard — Trang tổng quan học viên]]
- **Incoming Links (Backlinks):** *None*
