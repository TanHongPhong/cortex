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

# A. Roadmap từng khóa AI Agent quốc tế

## 1. Hugging Face — AI Agents Course

**Level:** Beginner → Expert
**Định vị:** Free, open-source, cộng đồng mạnh, học từ nền tảng đến build agent thật. Khóa có các unit về agent fundamentals, smolagents, LlamaIndex, LangGraph, use cases, final assignment, fine-tuning function-calling, observability/evaluation và game agents. ([Hugging Face][1])

### Roadmap chi tiết

| Giai đoạn                       | Nội dung học                                                                       | Output                                   |
| ------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------- |
| **Unit 0 — Onboarding**         | Giới thiệu khóa, setup môi trường học                                              | Biết cách học, tham gia Discord, nộp bài |
| **Unit 1 — Agent Fundamentals** | AI Agent là gì, LLM là “brain” của agent, messages, special tokens, chat templates | Hiểu nền tảng agent                      |
|                                 | Tools, Python functions as tools, actions, observations                            | Biết agent dùng tool như thế nào         |
|                                 | Thought → Action → Observation cycle                                               | Nắm vòng lặp tư duy của agent            |
|                                 | ReAct framework                                                                    | Hiểu pattern reasoning + acting          |
|                                 | Build first agent với smolagents                                                   | Có agent đầu tiên                        |
|                                 | Publish agent lên Hugging Face Spaces                                              | Có demo public                           |
| **Unit 2.1 — smolagents**       | CodeAgents, tool-calling agents, JSON/actions                                      | Build agent bằng framework nhẹ           |
|                                 | Custom tools, retrieval agents, multi-agent systems                                | Biết mở rộng agent                       |
|                                 | Vision agent, browser agent                                                        | Agent xử lý ảnh/web                      |
| **Unit 2.2 — LlamaIndex**       | LlamaHub, components, tools, agents, workflows                                     | Dùng LlamaIndex cho knowledge/RAG agent  |
|                                 | Event-driven async workflow                                                        | Thiết kế workflow phức tạp hơn           |
|                                 | Document parsing với LlamaParse                                                    | Xử lý tài liệu                           |
| **Unit 2.3 — LangGraph**        | Building blocks, graph, document analysis graph                                    | Làm agent workflow dạng graph            |
| **Unit 3 — Use Cases**          | Làm use case thực tế theo từng chủ đề                                              | Có project ứng dụng                      |
| **Unit 4 — Final Assignment**   | Build final agent, nộp bài, tham gia challenge                                     | Có project hoàn chỉnh                    |
| **Bonus 1**                     | Fine-tune model cho function-calling                                               | Nâng cao khả năng tool use               |
| **Bonus 2**                     | Observability & evaluation                                                         | Theo dõi và đánh giá agent               |
| **Bonus 3**                     | Agents in games / Pokémon                                                          | Ứng dụng agent trong game                |

### Cái đáng học từ khóa này

Hugging Face có roadmap rất chuẩn cho người mới: **Fundamentals → Tools → Frameworks → Use cases → Final challenge**. Điểm hay là [[web/page/website/certificate|certificate]] gắn với việc hoàn thành unit và bài nộp, không chỉ học lý thuyết.

---

## 2. Microsoft — AI Agents for Beginners

**Level:** Beginner/Developer
**Định vị:** Free GitHub course, thiên về agent patterns, code samples, Microsoft Agent Framework, Azure AI Foundry. Mỗi lesson có README, video, Python code sample và tài nguyên bổ sung. ([GitHub][2])

### Roadmap chi tiết

| Lesson | Chủ đề                                | Nội dung chính                         |
| ------ | ------------------------------------- | -------------------------------------- |
| 1      | Intro to AI Agents and Use Cases      | Agent là gì, các use case thực tế      |
| 2      | Exploring Agentic Frameworks          | So sánh framework, cách chọn framework |
| 3      | Understanding Agentic Design Patterns | Các design pattern phổ biến            |
| 4      | Tool Use Design Pattern               | Agent gọi tool/API/function            |
| 5      | Agentic RAG                           | Agent kết hợp retrieval + generation   |
| 6      | Building Trustworthy AI Agents        | Trust, safety, responsible AI          |
| 7      | Planning Design Pattern               | Agent biết lập kế hoạch nhiều bước     |
| 8      | Multi-Agent Design Pattern            | Nhiều agent phối hợp                   |
| 9      | Metacognition Design Pattern          | Agent tự kiểm tra/tự phản tư           |
| 10     | AI Agents in Production               | Đưa agent vào môi trường production    |
| 11     | Agentic Protocols                     | MCP, A2A, NLWeb                        |
| 12     | Context Engineering                   | Quản trị context cho agent             |
| 13     | Memory Design Pattern                 | Short-term/long-term memory            |
| 14     | Microsoft Agent Framework             | Dùng framework của Microsoft           |
| 15     | Browser-use and Computer Use Agents   | Agent điều khiển trình duyệt/máy tính  |
| 16     | Deploying Scalable AI Agents          | Deploy agent có khả năng scale         |
| 17     | Local Agents                          | Agent chạy local                       |

### Cái đáng học từ khóa này

Khóa này mạnh ở **design patterns**. Nếu Blueprint muốn dạy có hệ thống, nên lấy logic:

```text
Tool Use → RAG → Planning → Multi-Agent → Memory → Context Engineering → Production
```

---

## 3. DeepLearning.AI — AI Agents in LangGraph

**Level:** Intermediate
**Thời lượng:** Khoảng 1h32, 9 video lessons, 6 code examples, 1 graded assignment. Khóa dạy build agent từ Python + LLM, rồi rebuild bằng LangGraph, thêm agentic search, persistence, streaming, human-in-the-loop và essay writer workflow. ([DeepLearning.ai][3])

### Roadmap chi tiết

| Module | Nội dung                    | Output                            |
| ------ | --------------------------- | --------------------------------- |
| 1      | Introduction                | Hiểu mục tiêu khóa                |
| 2      | Build an Agent from Scratch | Tự build agent bằng Python        |
| 3      | LangGraph Components        | Hiểu node, edge, state, graph     |
| 4      | Agentic Search Tools        | Agent dùng search tool            |
| 5      | Persistence and Streaming   | Lưu state, stream output          |
| 6      | Human in the Loop           | Người dùng can thiệp vào workflow |
| 7      | Essay Writer                | Build workflow viết luận          |
| 8      | Resources and Conclusion    | Tài nguyên học tiếp               |
| 9      | Final Quiz                  | Kiểm tra cuối khóa                |

### Cái đáng học từ khóa này

Đây là roadmap rất gọn cho một khóa **LangGraph mini-course**:

```text
Build from scratch → Rebuild with framework → Add tools → Add memory/state → Add human review → Final workflow
```

---

## 4. DeepLearning.AI — Multi AI Agent Systems with crewAI

**Level:** Beginner/Intermediate
**Thời lượng:** Khoảng 2h41, 18 video lessons, 7 code examples. Khóa tập trung vào cách tạo team nhiều agent bằng crewAI, dùng role/goal/backstory, memory, tools, task breakdown, guardrails và các business process như resume prep, technical writing, customer support, outreach, event planning, financial analysis. ([DeepLearning.ai][4])

### Roadmap chi tiết

| Giai đoạn | Nội dung                   | Output                                             |
| --------- | -------------------------- | -------------------------------------------------- |
| 1         | Multi-agent là gì          | Hiểu vì sao cần nhiều agent                        |
| 2         | Role, goal, backstory      | Thiết kế nhân vật/tác vụ cho từng agent            |
| 3         | Tools                      | Agent dùng công cụ ngoài                           |
| 4         | Memory                     | Short-term, long-term, shared memory               |
| 5         | Task breakdown             | Chia việc lớn thành task nhỏ                       |
| 6         | Guardrails                 | Kiểm soát output và lỗi                            |
| 7         | Sequential collaboration   | Agent làm theo thứ tự                              |
| 8         | Parallel collaboration     | Agent làm song song                                |
| 9         | Hierarchical collaboration | Manager agent điều phối                            |
| 10        | Business use cases         | Resume, writing, support, outreach, event, finance |

### Cái đáng học từ khóa này

CrewAI rất hợp để dạy người mới hiểu **“agent như một team làm việc”**. Công thức hay:

```text
Role → Goal → Backstory → Task → Tool → Process → Output
```

---

## 5. DeepLearning.AI / Coursera — Design, Develop, and Deploy Multi-Agent Systems with CrewAI

**Level:** Beginner nhưng dài hơn, thiên về deploy và production
**Thời lượng:** Khoảng 12h58, 38 videos, 6 code examples, 7 graded [[web/page/student/assignments|assignments]]. Khóa có 4 module lớn: foundations, tools/memory/guardrails/hooks, orchestration với Crews & Flows, và business adoption. Projects công khai gồm automated code reviewer, meeting co-pilot, deep researcher. ([DeepLearning.ai][5])

### Roadmap chi tiết

| Module                             | Nội dung chính                                                              | Output                            |
| ---------------------------------- | --------------------------------------------------------------------------- | --------------------------------- |
| **Module 1 — Foundations**         | AI agent là gì, use cases, intelligent agents, planning multi-agent systems | Hiểu cách thiết kế hệ multi-agent |
|                                    | Production mindset, debug, observe, optimize, scale                         | Tư duy production                 |
|                                    | Lab: first agent, first multi-agent system                                  | Có prototype đầu tiên             |
| **Module 2 — Working with Agents** | Guardrails, execution hooks, memory, knowledge                              | Agent đáng tin hơn                |
|                                    | Custom tools, MCP, meeting preparation co-pilot                             | Agent dùng tool/protocol          |
|                                    | Improve deep research crew                                                  | Nâng cấp research agent           |
| **Module 3 — Managing Agents**     | Sequential, parallel, hierarchical, hybrid, async orchestration             | Biết nhiều kiểu điều phối         |
|                                    | Flows, tracing, sampling, observability                                     | Theo dõi workflow                 |
|                                    | Human-in-the-loop feedback, structured evaluation                           | Đánh giá/cải tiến agent           |
|                                    | Lab: coordination patterns, deep research flow                              | Build flow phức tạp               |
| **Module 4 — Business Adoption**   | AI agents trong doanh nghiệp, case interviews                               | Biết ứng dụng thực tế             |
|                                    | Case: Exa, Snyk, Weaviate, AB InBev                                         | Hiểu case enterprise              |

### Cái đáng học từ khóa này

Đây là bản nâng cấp của khóa CrewAI ngắn. Nó dạy theo logic:

```text
Prototype → Tools/Memory/Guardrails → Orchestration → Evaluation → Business Adoption
```

---

## 6. Coursera / Vanderbilt — AI Agent Developer Specialization

**Level:** Beginner → Intermediate
**Định vị:** 6-course specialization, dạy từ Python agent framework, [[web/architecture|architecture]], custom GPTs, prompt engineering, advanced data analysis đến trustworthy generative AI. Mục tiêu là build/deploy agents dùng Python, tools, memory, reasoning, custom GPTs và responsible AI. ([Coursera][6])

### Roadmap chi tiết

| Course | Tên                                                      | Nội dung chính                                                                      | Output                      |
| ------ | -------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------- |
| 1      | **AI Agents and Agentic AI with Python & Generative AI** | Build complete AI agent framework bằng Python                                       | Có agent framework cơ bản   |
|        |                                                          | Tool discovery, function calling                                                    | Agent biết gọi tool         |
|        |                                                          | File explorer, documentation generation, coding agents                              | Agent xử lý task thực tế    |
| 2      | **AI Agents and Agentic AI Architecture in Python**      | Personas, unstructured data transformation                                          | Thiết kế agent [[web/architecture|architecture]] |
|        |                                                          | Multi-agent collaboration, shared memory, coordination                              | Hệ nhiều agent              |
|        |                                                          | Trustworthy/safe [[web/architecture|architecture]], staged execution, reversible actions                 | Agent an toàn hơn           |
| 3      | **OpenAI GPTs: Creating Your Own Custom AI Assistants**  | Custom GPTs cho nhiều ngành                                                         | Tạo assistant riêng         |
|        |                                                          | Human-centered design, personalization, testing                                     | Assistant dùng được hơn     |
|        |                                                          | RAG, tool calling, responsible AI                                                   | Assistant có dữ liệu/tool   |
| 4      | **Prompt Engineering for ChatGPT**                       | Prompt patterns, prompt applications                                                | Nền tảng prompt             |
| 5      | **ChatGPT Advanced Data Analysis**                       | Code Interpreter, PDF/PPT/Excel/image/video, automation, visualization, text mining | AI xử lý dữ liệu/tài liệu   |
| 6      | **Trustworthy Generative AI**                            | Problem selection, framing, verification, validation, responsible AI                | Dùng AI đáng tin hơn        |

### Cái đáng học từ khóa này

Khóa này không chỉ dạy agent framework mà dạy cả **prompt, custom GPT, data analysis, trustworthy AI**. Roadmap phù hợp nếu Blueprint muốn xây hệ:

```text
Prompt → Python Agent → Architecture → Custom Assistant → Data/Document Automation → Trustworthy AI
```

---

## 7. Microsoft / Coursera — AI Agents: From Foundations to Applications Professional Certificate

**Level:** Developer
**Định vị:** 4-course professional [[web/page/website/certificate|certificate]], dành cho người có nền lập trình/cloud. Dạy Azure AI Foundry, AutoGen, Bot Framework, Semantic Kernel, Microsoft Graph API, [[web/security|security]], deployment, responsible AI. Projects gồm hotel information agent, medical information agent và multi-agent business system. ([Coursera][7])

### Roadmap chi tiết

| Course                                                     | Nội dung                                         | Output                    |
| ---------------------------------------------------------- | ------------------------------------------------ | ------------------------- |
| **Course 1 — AI Agent Fundamentals with Azure AI Foundry** | Agent fundamentals, build/configure agents       | Agent đầu tiên trên Azure |
|                                                            | Prompt engineering, conversation management      | Agent hội thoại tốt hơn   |
|                                                            | Language/search/translation integration          | Agent dùng dịch vụ cloud  |
|                                                            | Test, deploy, document                           | Có deployment cơ bản      |
| **Course 2 — Building Intelligent Agent Workflows**        | Context-aware agents                             | Agent hiểu ngữ cảnh       |
|                                                            | Azure Functions, Logic Apps orchestration        | Kết nối workflow          |
|                                                            | APIs, tools, knowledge systems                   | Agent dùng dữ liệu/tool   |
|                                                            | Reliability, compliance                          | Workflow ổn định hơn      |
| **Course 3 — Code and Framework-Based Agent Development**  | Azure OpenAI, complex reasoning, prompt chaining | Agent reasoning tốt hơn   |
|                                                            | Python Bot Framework                             | Build bot/agent bằng code |
|                                                            | Semantic Kernel plugins, memory                  | Plugin + memory           |
|                                                            | Microsoft Graph API                              | Tích hợp enterprise tools |
|                                                            | Error handling, [[web/security|security]], cost                   | Tư duy production         |
| **Course 4 — Building Multi-Agent Systems**                | AutoGen, collaborative AI systems                | Multi-agent system        |
|                                                            | Responsible AI, enterprise [[web/security|security]]              | Agent an toàn             |
|                                                            | Azure Entra, SharePoint, Docker, Kubernetes      | Enterprise deployment     |
|                                                            | Monitoring                                       | Theo dõi vận hành         |

### Cái đáng học từ khóa này

Đây là roadmap enterprise khá chuẩn:

```text
Foundations → Workflow Integration → Code Frameworks → Multi-Agent → Security/Deploy/Monitor
```

---

## 8. DataCamp — Introduction to AI Agents

**Level:** Basic / No-code
**Thời lượng:** 1h30, 10 videos, 27 exercises, không yêu cầu coding. Khóa dạy agent khác chatbot/automation/genAI ở đâu, các thành phần như memory, tool use, orchestration, TAO/ReAct, multi-agent và responsible use. ([DataCamp][8])

### Roadmap chi tiết

| Chapter                                         | Nội dung                       | Output                   |
| ----------------------------------------------- | ------------------------------ | ------------------------ |
| **1 — Foundations of AI Agents**                | What is an agent?              | Hiểu khái niệm           |
|                                                 | Agent vs chatbot vs automation | Phân biệt đúng           |
|                                                 | Anatomy of an agent            | Biết thành phần          |
|                                                 | Agent or not?                  | Nhận diện use case       |
|                                                 | Build vs buy decision          | Biết khi nào nên build   |
| **2 — Agentic Design Patterns & Architectures** | TAO cycle                      | Hiểu Think–Act–Observe   |
|                                                 | ReAct                          | Hiểu reasoning + acting  |
|                                                 | Tools and toolbox              | Agent dùng công cụ       |
|                                                 | Multi-agent systems            | Một agent vs nhiều agent |
|                                                 | Manager pattern                | Agent điều phối          |
| **3 — Responsible AI Agents**                   | Guardrails                     | Kiểm soát rủi ro         |
|                                                 | Risk minimization              | Giảm lỗi/hallucination   |
|                                                 | Safety-first playbook          | Quy trình dùng an toàn   |
|                                                 | Performance review             | Đánh giá agent           |

### Cái đáng học từ khóa này

Đây là khóa rất hợp để tham khảo cho **Starter**: nhẹ, dễ hiểu, không code, nhưng vẫn dạy đúng framework tư duy.

---

## 9. DataCamp — Building AI Agents with CrewAI

**Level:** Intermediate Python
**Định vị:** Từ chatbot sang crew, build research agent, ghép nhiều agent để research/analyze/report, thêm memory, decision-making, stateful workflows và CrewAI flows. ([DataCamp][9])

### Roadmap chi tiết

| Chapter                    | Nội dung             | Output                                  |
| -------------------------- | -------------------- | --------------------------------------- |
| **1 — From Agent to Crew** | Build first agent    | Có agent đầu tiên                       |
|                            | Roles, goals, tools  | Agent có nhiệm vụ rõ                    |
|                            | Assign tasks         | Biết giao việc cho agent                |
|                            | Launch research crew | Crew nghiên cứu đầu tiên                |
| **2 — Smarter Flows**      | Add memory           | Agent nhớ context                       |
|                            | Routing              | Agent chọn luồng xử lý                  |
|                            | Specialist teams     | Nhiều agent chuyên môn                  |
|                            | Multiple crews       | Điều phối nhiều crew                    |
|                            | Stateful flow        | Workflow có trạng thái                  |
| **Final use case**         | Content studio       | Agent research, analyze, create content |

### Cái đáng học từ khóa này

Roadmap này rất hợp để tạo khóa mini:

```text
Single Agent → Crew → Memory → Routing → Multi-Crew → Content Studio Project
```

---

## 10. Udacity — AI Agents with LangChain and LangGraph

**Level:** Intermediate
**Thời lượng:** 15 giờ, 40 lessons, 1 project. Khóa yêu cầu REST APIs, OpenAI API, Python nâng cao và hiểu LLMs. Nội dung đi từ OpenAI API, custom agent, design patterns, LangChain, RAG, LangGraph, database agents, memory, Agentic RAG, evaluation, HITL, observability và [[web/security|security]]. ([Udacity][10])

### Roadmap chi tiết

| Giai đoạn | Nội dung                         | Output                                      |
| --------- | -------------------------------- | ------------------------------------------- |
| 1         | Course introduction              | Hiểu scope                                  |
| 2         | From LLM Calls to Agents         | Chuyển từ gọi LLM sang agent                |
| 3         | OpenAI APIs                      | Gọi model bằng API                          |
| 4         | Custom Agent Implementation      | Tự build agent                              |
| 5         | Agentic Design Patterns          | Reflection, tool use, planning, multi-agent |
| 6         | Self-reflection                  | Agent tự kiểm tra                           |
| 7         | Function Calling                 | Agent gọi function                          |
| 8         | ReAct                            | Agent reason + act                          |
| 9         | Multi-agent                      | Nhiều agent phối hợp                        |
| 10        | Framework concerns               | Vì sao cần framework                        |
| 11        | LangChain basics                 | Build app bằng LangChain                    |
| 12        | Streaming and structured outputs | Output ổn định hơn                          |
| 13        | Multi-step workflows             | Workflow nhiều bước                         |
| 14        | LangChain RAG                    | Retrieval-augmented generation              |
| 15        | LangChain tools                  | Tool integration                            |
| 16        | LangChain agent                  | Agent bằng LangChain                        |
| 17        | LangGraph workflows              | Graph-based workflow                        |
| 18        | State implementation             | Quản lý state                               |
| 19        | Database agents / SQL            | Agent hỏi dữ liệu                           |
| 20        | Messaging and short-term memory  | Nhớ hội thoại                               |
| 21        | Agent knowledge                  | Knowledge integration                       |
| 22        | External APIs                    | Gọi API ngoài                               |
| 23        | Long-term memory / LangMem       | Memory dài hạn                              |
| 24        | Agentic RAG                      | RAG có agent planning                       |
| 25        | Single-agent RAG                 | RAG agent đơn                               |
| 26        | Reliability and evaluation       | Đánh giá độ tin cậy                         |
| 27        | Human-in-the-loop                | Có người kiểm duyệt                         |
| 28        | Observability / MLflow           | Theo dõi agent                              |
| 29        | RAGAS                            | Đánh giá RAG                                |
| 30        | Security                         | Bảo mật agent                               |

### Cái đáng học từ khóa này

Đây là roadmap kỹ thuật rất đầy đủ cho Core/Advanced nếu Blueprint muốn dạy sâu về LangChain + LangGraph.

---

## 11. Udacity — Agentic AI Engineer with LangChain and LangGraph

**Level:** Intermediate Nanodegree
**Định vị:** 3 courses, 40 lessons, 3 [[web/page/website/projects|projects]]. Dạy LangChain fundamentals, LangGraph agent systems, external APIs/MCP, database agents, Agentic RAG, HITL, observability, evaluation, long-term memory, LangMem và multi-agent [[web/architecture|architecture]]. ([Udacity][11])

### Roadmap chi tiết

| Course                                           | Nội dung                                                 | Project                    |
| ------------------------------------------------ | -------------------------------------------------------- | -------------------------- |
| **Course 1 — LangChain Agentic AI Fundamentals** | LangChain apps, structured outputs, multi-step workflows | Report-Building Agent      |
|                                                  | Agentic patterns, tools, LangGraph state/memory          |                            |
| **Course 2 — Building AI Agents with LangGraph** | External APIs, MCP                                       | Energy Advisor Project     |
|                                                  | Database agents, SQL/vector DB                           |                            |
|                                                  | Agentic RAG                                              |                            |
|                                                  | HITL, observability, MLflow                              |                            |
|                                                  | Evaluation, RAGAS                                        |                            |
| **Course 3 — Advanced Agentic AI Techniques**    | Long-term memory: semantic, episodic, procedural         | Autonomous Knowledge Agent |
|                                                  | LangGraph + LangMem                                      |                            |
|                                                  | Multi-agent [[web/architecture|architecture]]                                 |                            |
|                                                  | State management                                         |                            |
|                                                  | Multi-agent workflows, content pipelines                 |                            |

### Cái đáng học từ khóa này

Khóa này có project progression rất đẹp:

```text
Report Agent → Energy Advisor Agent → Autonomous Knowledge Agent
```

Đây là kiểu Blueprint nên học: mỗi khóa phải có **project có tên rõ ràng**, không chỉ “học module”.

---

## 12. LangChain Academy — Introduction to LangGraph

**Level:** Foundation
**Định vị:** Free, 55 lessons, khoảng 6 giờ video. Dạy LangGraph từ setup đến graph, state, memory, streaming, human-in-the-loop, subgraphs, map-reduce, research assistant, long-term memory và deployment. ([LangChain Academy][12])

### Roadmap chi tiết

| Module                                  | Nội dung                           | Output                     |
| --------------------------------------- | ---------------------------------- | -------------------------- |
| **Module 0 — Setup**                    | Cài đặt môi trường                 | Sẵn sàng code              |
| **Module 1 — Introduction**             | Simple graph, chain, router, agent | Hiểu graph cơ bản          |
|                                         | Agent with memory                  | Agent có memory            |
|                                         | Optional deploy                    | Biết deploy sơ bộ          |
| **Module 2 — State and Memory**         | State schema, reducers             | Quản lý state              |
|                                         | Multiple schemas                   | State phức tạp             |
|                                         | Trim/filter/summarize messages     | Quản lý context            |
|                                         | External memory                    | Memory ngoài               |
| **Module 3 — UX and Human-in-the-loop** | Streaming                          | UX tốt hơn                 |
|                                         | Breakpoints                        | Dừng workflow              |
|                                         | Editing state, human feedback      | Người dùng can thiệp       |
|                                         | Time travel                        | Debug trạng thái           |
| **Module 4 — Assistant**                | Parallelization                    | Chạy song song             |
|                                         | Subgraphs                          | Chia workflow              |
|                                         | Map-reduce                         | Xử lý nhiều tài liệu       |
|                                         | Research assistant                 | Build assistant nghiên cứu |
| **Module 5 — Long-term Memory**         | Short-term vs long-term memory     | Hiểu memory [[web/architecture|architecture]]   |
|                                         | LangGraph Store                    | Lưu memory                 |
|                                         | Memory schema/profile/collection   | Thiết kế memory            |
| **Module 6 — Deployment**               | Create/connect deployment          | Đưa lên môi trường chạy    |
|                                         | Double texting, assistants         | Vận hành assistant         |

### Cái đáng học từ khóa này

LangChain Academy rất mạnh ở **state, memory, HITL và deployment**, những thứ khóa beginner thường bỏ qua.

---

## 13. Google / Kaggle — 5-Day AI Agents Intensive

**Level:** Intermediate
**Định vị:** 5 ngày intensive, do Google và Kaggle tổ chức. Nội dung public mô tả bao gồm agent architectures, tools, memory, evaluation, từ prototype đến production, có codelabs/live và capstone project. ([blog.google][13])

### Roadmap có thể rút ra từ thông tin công khai

| Ngày  | Nội dung                           | Output                       |
| ----- | ---------------------------------- | ---------------------------- |
| Day 1 | Agent architectures                | Hiểu kiến trúc agent         |
| Day 2 | Tools                              | Agent dùng công cụ           |
| Day 3 | Memory                             | Agent nhớ trạng thái/context |
| Day 4 | Evaluation                         | Đánh giá agent               |
| Day 5 | Prototype to production + capstone | Có project cuối              |

### Cái đáng học từ khóa này

Format “5-day intensive” rất đáng tham khảo để làm challenge miễn phí hoặc mini cohort:

```text
Architecture → Tools → Memory → Evaluation → Capstone
```

---

## 14. Google Skills — Gen AI Agents: Transform Your Organization

**Level:** Beginner / Business leader
**Thời lượng:** Khoảng 5 giờ, 5 modules. Khóa không yêu cầu kinh nghiệm trước, dạy components của gen AI agents, cách kết hợp components, Google Cloud gen AI products và cách lead/manage AI transformation trong tổ chức. ([Coursera][14])

### Roadmap chi tiết

| Module                             | Nội dung                                           | Output                         |
| ---------------------------------- | -------------------------------------------------- | ------------------------------ |
| **1 — Modern Agents**              | Lịch sử/components của agents                      | Hiểu agent ở mức business      |
| **2 — Building Agents**            | Models, Google APIs, parameter playground          | Hiểu cách agent dùng model/API |
|                                    | Prompt engineering, reasoning loops, tooling       | Tư duy build agent             |
|                                    | Building apps from agents                          | Ý tưởng sản phẩm               |
| **3 — Customer Experience Agents** | RAG, tooling, search agents                        | Agent cho khách hàng           |
|                                    | Vertex AI Search shopping use case                 | Case thương mại                |
|                                    | Customer engagement, Gemini Enterprise             | Case doanh nghiệp              |
| **4 — Strategy: Planning Ahead**   | AI integration, business impact, change management | Kế hoạch ứng dụng AI           |
| **5 — Transformation**             | Quản trị thay đổi khi đưa AI vào tổ chức           | Roadmap ứng dụng trong tổ chức |

### Cái đáng học từ khóa này

Khóa này không dành cho dev, mà dành cho **business adoption**. Blueprint có thể học cách giải thích AI Agent bằng ngôn ngữ dễ hiểu cho người không kỹ thuật.

---

## 15. Google — ADK Crash Course / Build Agents with ADK

**Level:** Developer
**Định vị:** Hands-on với Google Agent Development Kit. Nội dung public có 2 notebook chính: Tools & Memory và Multi-Agents; dạy tạo agent đầu tiên với Google Search, custom tools/APIs, Agent-as-a-Tool, routers, sequential/loops/parallel orchestration và memory. ([Google Codelabs][15])

### Roadmap chi tiết

| Giai đoạn | Nội dung                             | Output                   |
| --------- | ------------------------------------ | ------------------------ |
| 1         | ADK concepts: Agent, Session, Runner | Hiểu framework           |
| 2         | First agent with Google Search       | Agent có search tool     |
| 3         | Custom tools and APIs                | Agent dùng API riêng     |
| 4         | Tools & Memory notebook              | Agent có memory          |
| 5         | Multi-agent notebook                 | Nhiều agent phối hợp     |
| 6         | Agent-as-a-Tool                      | Agent này gọi agent khác |
| 7         | Routers                              | Điều hướng tác vụ        |
| 8         | Sequential flows                     | Workflow tuần tự         |
| 9         | Loops                                | Workflow lặp             |
| 10        | Parallel flows                       | Workflow song song       |

### Cái đáng học từ khóa này

Google ADK rất rõ ở phần orchestration:

```text
Single Agent → Tools → Memory → Agent-as-Tool → Router → Sequential/Loop/Parallel Multi-Agent
```

---

## 16. Google Skills — Deploy Multi-Agent Systems with ADK and Agent Engine

**Level:** Advanced
**Thời lượng:** Khoảng 6 giờ, self-paced. Khóa dạy xây multi-agent system bằng ADK, dùng tools, parent-child relationships/flows, chạy local, deploy lên Vertex AI Agent Engine, mở rộng bằng MCP/A2A và đánh giá bằng Vertex AI GenAI Evaluation Service. ([Class Central][16])

### Roadmap chi tiết

| Module | Nội dung                     | Output                            |
| ------ | ---------------------------- | --------------------------------- |
| 1      | Introduction                 | Hiểu scope                        |
| 2      | Introducing ADK              | Hiểu Agent Development Kit        |
| 3      | Develop agents with ADK      | Configure ADK, get started, tools |
| 4      | Build multi-agent systems    | Callbacks, multi-agent            |
| 5      | Deploy agent to Agent Engine | Deploy lên Vertex AI              |
| 6      | Extend with MCP and A2A      | Kết nối protocol                  |
| 7      | Evaluate ADK agent systems   | Dùng GenAI Evaluation Service     |
| 8      | Badge                        | Hoàn thành chứng nhận             |

### Cái đáng học từ khóa này

Đây là roadmap production theo hệ Google:

```text
ADK Basics → Tools → Multi-Agent → Deploy → Protocols → Evaluation
```

---

## 17. Maven — AI Agent Engineering: From ReAct, Agentic RAG to Multi-Agent Orchestration

**Level:** Engineer / Tech lead
**Định vị:** Live cohort cao cấp, thiên về enterprise agent, LangChain, CrewAI, LangGraph, ReAct, Agentic RAG, multi-agent RAG, observability, retries, context engineering, code review clinics. ([maven.com][17])

### Roadmap công khai

| Giai đoạn  | Nội dung                                         | Output                          |
| ---------- | ------------------------------------------------ | ------------------------------- |
| Week 1     | Foundations of true agentic system in enterprise | Hiểu agent production khác demo |
|            | ReAct, context engineering                       | Agent reasoning tốt hơn         |
|            | Guided Python notebooks                          | Có implementation               |
| Week 2     | Agentic RAG                                      | RAG nâng cao                    |
|            | Multi-agent workflows                            | Workflow nhiều agent            |
|            | Observability, retries                           | Agent ổn định hơn               |
| Throughout | Live code review clinics                         | Feedback trực tiếp              |
| Throughout | Weekly milestones                                | Tiến độ rõ                      |
| Final      | Enterprise-ready agent design                    | Có [[web/architecture|architecture]]/deploy thinking |

### Cái đáng học từ khóa này

Điểm hay nằm ở format:

```text
Live cohort + notebooks + weekly milestone + code review clinic + enterprise case
```

Đây là cách đóng gói để bán giá cao hơn khóa video thường.

---

## 18. Maven — Agent Engineering Bootcamp: Developers Edition

**Level:** Developer nâng cao
**Định vị:** Bootcamp live, giá cao, dạy agent harness, Agentic RAG, voice agents, multi-agent orchestration, MCP/A2A, guardrails, eval, production deployment, Llama Guard, GCP monitoring. ([maven.com][18])

### Roadmap chi tiết

| Giai đoạn | Nội dung                                    | Output                                                 |
| --------- | ------------------------------------------- | ------------------------------------------------------ |
| 1         | Agent harness                               | Khung chạy agent                                       |
| 2         | ReAct loop                                  | Reasoning + acting                                     |
| 3         | Tracing, decision auditing                  | Theo dõi quyết định                                    |
| 4         | Memory, termination control                 | Agent nhớ và biết dừng                                 |
| 5         | LLM optimization                            | GPTQ, GGUF, QLoRA, AWQ, KV cache, speculative decoding |
| 6         | Agentic RAG                                 | Retrieval-as-tool, query planning, multi-hop           |
| 7         | Semantic chunking, GraphRAG, semantic cache | RAG nâng cao                                           |
| 8         | Real-time voice agents                      | STT → LLM → TTS, turn-taking, barge-in                 |
| 9         | Multi-agent topology                        | Hierarchical, debate, orchestrator-worker              |
| 10        | Protocols                                   | MCP, A2A                                               |
| 11        | Guardrails                                  | Llama Guard, NeMo, prompt-injection defense            |
| 12        | Evaluation                                  | Golden tasks, trajectory eval, LLM-as-judge            |
| 13        | Deployment                                  | Google ADK, GCP monitoring                             |
| 14        | Demo day                                    | Showcase project                                       |

### Cái đáng học từ khóa này

Khóa này là “đỉnh kỹ thuật”. Không phù hợp làm beginner, nhưng rất đáng tham khảo cho Advanced/Lab sau này.

---

## 19. Udemy — Production AI Agents with LangChain + LangGraph

**Level:** Python developer
**Định vị:** Production-first, build deployable code; có [[web/security|security]], testing, error handling, fallbacks, cost optimization, monitoring, final API project. Syllabus công khai qua trang khóa và Class Central cho thấy có LCEL, structured output, streaming, production RAG, vector stores, multi-query, contextual compression, hybrid search, LangGraph state machines, conditional routing, self-correcting loops, HITL. ([Udemy][19])

### Roadmap rút ra từ thông tin công khai

| Giai đoạn | Nội dung                                       | Output                 |
| --------- | ---------------------------------------------- | ---------------------- |
| 1         | LangChain LCEL                                 | Chain production-ready |
| 2         | Structured output, streaming, batch, providers | Output ổn định         |
| 3         | Production RAG                                 | RAG dùng được thật     |
| 4         | Chunking, vector stores                        | Knowledge base         |
| 5         | Multi-query retrieval                          | Retrieval tốt hơn      |
| 6         | Contextual compression                         | Giảm nhiễu context     |
| 7         | Hybrid search                                  | Tìm kiếm nâng cao      |
| 8         | LangGraph state machines                       | Workflow có state      |
| 9         | Conditional routing                            | Điều hướng luồng       |
| 10        | Self-correcting loops                          | Agent tự sửa           |
| 11        | HITL                                           | Người kiểm duyệt       |
| 12        | Testing, [[web/security|security]], monitoring                  | Production readiness   |
| 13        | Final API project                              | Deployable agent API   |

### Cái đáng học từ khóa này

Roadmap này phù hợp cho khóa **Advanced developer**:

```text
RAG Production → LangGraph Workflow → Self-correction → HITL → Monitoring → API Project
```

---

## 20. Nhóm Udemy Agentic AI Bootcamps — LangGraph, CrewAI, MCP, OpenAI Agents SDK, AutoGen

**Level:** Beginner → Intermediate/Developer
**Định vị chung:** Marketplace courses trên Udemy thường đóng gói theo hướng “build nhiều project”. Một số khóa công khai mô tả dùng LangGraph, CrewAI, MCP, OpenAI Agents SDK, AutoGen, n8n, Python, RAG, Flowise, Cursor; có khóa hứa 8 real-world [[web/page/website/projects|projects]], agents/handoffs/guardrails, runner.run, tracing, collaborative systems. ([Udemy][20])

### Roadmap phổ biến rút ra

| Giai đoạn | Nội dung                 | Output                             |
| --------- | ------------------------ | ---------------------------------- |
| 1         | Agentic AI fundamentals  | Hiểu agentic AI                    |
| 2         | OpenAI Agents SDK        | Build agent bằng SDK               |
| 3         | Agent run loop           | Chạy agent                         |
| 4         | Handoffs                 | Chuyển việc giữa agents            |
| 5         | Guardrails               | Kiểm soát output                   |
| 6         | Tracing                  | Theo dõi agent                     |
| 7         | LangGraph workflows      | Workflow graph                     |
| 8         | CrewAI teams             | Multi-agent team                   |
| 9         | AutoGen systems          | Multi-agent collaboration          |
| 10        | MCP                      | Agent dùng protocol/tool ecosystem |
| 11        | RAG                      | Agent dùng dữ liệu                 |
| 12        | n8n / Flowise / low-code | Automation không code nhiều        |
| 13        | Real-world [[web/page/website/projects|projects]]      | Portfolio apps                     |

### Cái đáng học từ nhóm Udemy

Udemy mạnh ở “project marketing”: không chỉ nói học gì, mà nói rõ **build 5–8 apps gì**. Blueprint nên học cách đóng gói project names thật hấp dẫn.

---

# B. Các pattern curriculum lặp lại ở hầu hết khóa AI Agent

Sau khi gom các khóa trên, anh thấy gần như mọi roadmap mạnh đều xoay quanh 12 nhóm kiến thức này:

| Thứ tự | Nhóm kiến thức                                       | Xuất hiện trong khóa nào                                    |
| -----: | ---------------------------------------------------- | ----------------------------------------------------------- |
|      1 | **AI Agent fundamentals**                            | Hugging Face, Microsoft, DataCamp, Google                   |
|      2 | **Prompt / instruction / context engineering**       | Microsoft, Coursera, Google, Vanderbilt                     |
|      3 | **LLM messages, system prompts, structured outputs** | Hugging Face, Udacity, LangChain                            |
|      4 | **Tool use / function calling / APIs**               | Gần như tất cả                                              |
|      5 | **Think–Act–Observe / ReAct**                        | Hugging Face, DataCamp, Maven, Udacity                      |
|      6 | **Memory / state**                                   | Microsoft, LangGraph, LangChain Academy, CrewAI, Google ADK |
|      7 | **RAG / Agentic RAG**                                | Microsoft, Udacity, Maven, LangChain, CrewAI                |
|      8 | **Workflow orchestration**                           | LangGraph, CrewAI, Google ADK                               |
|      9 | **Multi-agent systems**                              | CrewAI, Microsoft, Google, Udacity, Maven                   |
|     10 | **Guardrails / safety / trustworthy AI**             | Microsoft, DataCamp, Coursera, Maven                        |
|     11 | **Evaluation / observability / tracing**             | Hugging Face, LangChain, Udacity, Google, Maven             |
|     12 | **Deployment / production / monitoring**             | Microsoft, Google, Udacity, Maven, Udemy production courses |

---

# C. Roadmap “thô” tổng hợp từ thế giới

Đây chưa phải roadmap Blueprint, mà là **bản xương sống quốc tế**:

```text
1. AI Agent là gì
2. Agent vs chatbot vs automation
3. LLM basics: messages, prompts, system instructions
4. Prompt engineering & context engineering
5. Tool use / function calling / APIs
6. Agent loop: Think → Act → Observe
7. ReAct pattern
8. Structured output
9. Workflow design
10. Memory and state
11. RAG and knowledge base
12. Agentic RAG
13. Framework 1: LangChain
14. Framework 2: LangGraph
15. Framework 3: CrewAI
16. Framework 4: LlamaIndex / smolagents / ADK
17. Multi-agent orchestration
18. Human-in-the-loop
19. Guardrails and safety
20. Evaluation and testing
21. Observability and tracing
22. Deployment
23. Monitoring, cost, [[web/security|security]]
24. Final project / capstone
```

Nếu gom theo cấp độ học, nó sẽ thành:

| Level                   | Nên học gì                                                        |
| ----------------------- | ----------------------------------------------------------------- |
| **Beginner**            | Agent là gì, prompt, tools, TAO/ReAct, simple no-code agent       |
| **Starter Developer**   | Python/API basics, function calling, structured output            |
| **Core Builder**        | LangChain, LangGraph, CrewAI, RAG, memory, mini app               |
| **Advanced Builder**    | Multi-agent, HITL, evaluation, observability, deployment          |
| **Production/Industry** | Security, cost, monitoring, domain workflows, real data, capstone |

Chốt lại: các khóa tốt nhất trên thế giới không dạy AI Agent kiểu rời rạc. Chúng đều đi theo logic **foundation → tools → memory/RAG → orchestration → evaluation → production → project**. Đây là bộ nguyên liệu rất tốt để bước sau anh xây cho em một roadmap riêng cho Blueprint theo các gói **Free / Starter / Core / Advanced**.

[1]: https://huggingface.co/learn/agents-analysis/en/unit0/introduction "Welcome to the  AI Agents Course · Hugging Face"
[2]: https://github.com/microsoft/ai-agents-for-beginners "GitHub - microsoft/ai-agents-for-beginners: 12 Lessons to Get Started Building AI Agents · GitHub"
[3]: https://www.deeplearning.ai/courses/ai-agents-in-langgraph "https://www.deeplearning.ai/courses/ai-agents-in-langgraph"
[4]: https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai "https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai"
[5]: https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai "https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai"
[6]: https://www.coursera.org/specializations/ai-agents "AI Agent Developer | Coursera"
[7]: https://www.coursera.org/professional-certificates/microsoft-ai-agents "https://www.coursera.org/professional-certificates/microsoft-ai-agents"
[8]: https://www.datacamp.com/courses/introduction-to-ai-agents "Agentic AI Course: Introduction to AI Agents  Course | DataCamp"
[9]: https://www.datacamp.com/courses/building-ai-agents-with-crewai "Building AI Agents with CrewAI Course | DataCamp"
[10]: https://www.udacity.com/analysis/ai-agents-with-langchain-and-langgraph--cd13764 "AI Agents with LangChain and LangGraph | Online Course | Udacity"
[11]: https://www.udacity.com/analysis/agentic-ai-engineer-with-langchain-and-langgraph--nd901 "Build Autonomous AI Agents with LangChain | Udacity"
[12]: https://academy.langchain.com/courses/intro-to-langgraph "Foundation: Introduction to LangGraph - Python"
[13]: https://blog.google/innovation-and-ai/technology/developers-tools/ai-agents-intensive/ "Google and Kaggle launch AI Agents Intensive course"
[14]: https://www.coursera.org/learn/gen-ai-agents-transform-your-organization "Gen AI Agents: Transform Your Organization | Coursera"
[15]: https://codelabs.developers.google.com/onramp/instructions "ADK Crash Course - From Beginner To Expert  |  Google Codelabs"
[16]: https://www.classcentral.com/analysis/google-skills-deploy-multi-agent-systems-with-agent-development-kit-adk-and-agent-engine-462704 "Online Course: Deploy Multi-Agent Systems with Agent Development Kit (ADK) and Agent Engine from Google | Class Central"
[17]: https://maven.com/rakeshgohel/ai-agent-engineering-react-rag-multi-agent "AI Agent Engineering: From ReAct, Agentic RAG to Multi-Agent Orchestration by Rakesh Gohel on Maven"
[18]: https://maven.com/boring-bot/advanced-llm "Agent Engineering Bootcamp: Developers Edition by Hamza Farooq and Zain Hasan on Maven"
[19]: https://www.udemy.com/analysis/production-ai-agents/?srsltid=AfmBOoo2yVwoMazqoQ6hQ0h3aQGcvgZlp05oksQU4qb9srqGEF7Uty73&utm_source=chatgpt.com "Production AI Agents with LangChain + LangGraph [2026]"
[20]: https://www.udemy.com/analysis/agentic-ai-bootcamp-build-ai-agents/?srsltid=AfmBOorwZryibn6pPnD28NLJomGgOUH0lCTooDZAA6jDEpvcsruIBHIM&utm_source=chatgpt.com "Agentic AI: Build AI Agents with LangGraph, CrewAI & MCP"

---

## 🗺️ Obsidian Meta

### Tags
- #blueprint/course
- #blueprint/plan

### Navigation
- **Breadcrumbs:** [[BLUEPRINT_PLAN_MOC|Plan Home]]

### Relations
- **Outgoing Links:** [[web/architecture|Architecture — Kiến trúc kỹ thuật Blueprint]], [[web/page/student/assignments|/assignments — Legacy / Không ưu tiên MVP]], [[web/page/website/blog|/blog — Blog / Resources Hub]], [[web/page/website/certificate|/certificate — Trang chứng chỉ]], [[web/page/website/projects|/projects — Trang dự án học viên]], [[web/security|Security — Bảo mật hệ thống Blueprint]]
- **Incoming Links (Backlinks):** *None*
