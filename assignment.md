Week 9 : Building AI-Powered Applications
This week, we will learn how to build AI-powered features into our ThreadHive application using agentic
AI tools. We will use Claude Code as our agentic coding assistant.
The session is structured in two parts:
Part 1: Introduction to Claude Code
Part 2: AI features in ThreadHive (using Claude Code).
Project Setup and Structure
This week's starter code is the ThreadHive application that we have built thus far.
1. Download and extract the assignment starter code from the zip file provided on Olympus.
2. The project includes code for the backend and the frontend. We will be adding AI features to the
application, making changes across both the frontend and backend. So open the entire project
folder in VS Code to have access to both parts of the codebase.
jessicawitcher06@gmail.com
RYZ4NQ7KHB
3. To get the backend running, navigate to the backend folder, set up the environment variables in the
.env file, install dependencies, populate the database, and start the server:
Open a terminal and navigate to the backend folder 
cd threadhive-backend
.
Set up the environment variables in the .env file. Other than the usual backend environment
variables, you will also need to add an environment variable GEMINI_API_KEY for making API
requests to the Gemini service. To create a Gemini API key, go to Google AI Studio and create
a new API key with access to the Gemini API. Then copy the generated API key into your .env
file as the value for GEMINI_API_KEY.
Install dependencies: 
npm install
Populate the database: 
npm run populate
Start the server: 
npm run dev
4. To get the frontend running, open a new terminal, navigate to the frontend folder, install
dependencies, and start the development server:
Open a new terminal and navigate to the frontend folder 
cd threadhive-frontend
.
Install dependencies: 
npm install
Start the development server: 
npm run dev
Part 1 : Introduction to Claude Code
Claude Code is an agentic AI coding assistant that runs in your terminal. It reads your entire codebase,
edits files, runs shell commands, creates commits, and works across multiple files — all through natural
language. Unlike an inline code completion tool that suggests small snippets, Claude Code is a full coding
partner that can implement entire features, refactors, and bug fixes on demand.
In this session we cover the following topics on Claude Code:
1. Installation and set up
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 1 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
2. Core commands
3. Basic use cases: Codebase exploration, Git operations
4. Permission modes
5. Agent Skills
After understanding these topics, we will use Claude Code to add AI features to our ThreadHive
application in Part 2.
1. Claude Code Installation and Setup
Refer to the accompanying installation and setup guide for Claude Code for instruction on how to get set
up with the tool.
The official Quickstart Page has detailed instructions for installation, authentication, and getting started
with your first session.
Once you have Claude Code installed and authenticated, you can start a session in your project directory
by running 
claude
 in VS Code terminal. This will launch the agent and allow you to interact with it
through natural language commands. Note that it is not necessary to start Claude within a VS Code
terminal — you can start it in any terminal, but using VS Code's terminal allows you to easily view and edit
code files as the agent makes changes.
jessicawitcher06@gmail.com
RYZ4NQ7KHB
2. Core Commands
Type 
/
 at the Claude Code prompt to see all available commands. Here are the most important ones to
know:
Command What it does
/help
Show all available commands and usage tips
/model
Switch the AI model for the current session
/init
Generate a CLAUDE.md file from your codebase automatically
/usage
Show usage and activity statistics
/context 
Visualize context usage as a colored grid; shows capacity warnings
/clear
Clear conversation history and start a fresh context
/skills
List the Agent skills available
Let us explore some of these commands in more detail.
/model
 Command
This command allows you to switch between different AI models for the current session. For most of our
tasks we will use the Sonnet models. For complex tasks that require more reasoning, we can use the
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 2 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
Opus models. For simple tasks we can also use the faster and cheaper Haiku models.
/init
 Command
Run 
/init
 once when you first bring Claude Code into a project. It scans your codebase and generates a
CLAUDE.md
 with relevant instructions and context like coding standards, architecture notes, common
workflows for the agent when working in that project.
CLAUDE.md
 is a plain markdown file that gives Claude persistent instructions — coding standards,
architecture notes, common workflows. It is loaded automatically at the start of every session. It is the
Claude Code's equivalent of the 
AGENTS.md
 file we have used in previous sessions with Github Copilot.
The agent might ask your approval for running certain commands to explore the codebase. You can
select 'Yes, and do not ask again for similar commands..'
The 
Claude.md
 can be scoped at the project level (shared via git) or at the user level (in your home
directory) for personal preferences and tooling shortcuts.
Location
Scope
Use for
./CLAUDE.md
 or
./.claude/CLAUDE.md
Project (shared
via git)
Coding standards, architecture notes,
common workflows
~/.claude/CLAUDE.md
jessicawitcher06@gmail.com
RYZ4NQ7KHB
/usage
 Command
All your projects
Personal preferences, tooling shortcuts
Claude Code enforces its own usage limits based on your subscription plan. The 
/usage
 command
shows how much of your Claude Code plan you have consumed, including the number of messages,
tokens, and any overages. This is useful for keeping track of your usage and ensuring you stay within
your plan limits.
Refer to the Claude Code Learner's Guide document for more details on usage limits and best practices
for managing your usage. You can also check usage on the web at claude.ai/settings/usage. If you hit the
limit, your access to Claude Code will pause until it resets.
Tip: Carefully monitor your usage, especially when using more powerful models or running long
sessions, as it's easy to consume a lot of tokens without realizing it. Use the 
/context
 command
to keep an eye on how much context you're using in each session.
/context
 Command
This command visualizes how much of your context window you've used up in the current session. It
shows a colored grid where each block represents a portion of the context window. As you use more
context, the grid fills up and changes color to indicate how close you are to the limit. This helps you
manage your context usage and avoid hitting limits that could cause loss of information or degraded
performance.
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 3 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
/clear
 Command
Use this command to clear the conversation history and start with a fresh context. This can be useful if
you want to reset the session or if you feel that the current context has become too cluttered or irrelevant
for the task at hand.
/exit
 Command
This command exits the current Claude Code session and returns you to the terminal prompt. Use this
when you're done with your coding session or if you want to start a new one later.
Asking Claude About Itself
When unsure how a feature or command works, you can just ask Claude directly. For example:
Does the /clear command start a new conversation?
What does the /rewind command do?
jessicawitcher06@gmail.com
RYZ4NQ7KHB
Some CLI Commands
Here are some helpful commands you can use from your terminal (outside of an active session):
Command
What it does
Example
claude -c
Continue the most recent conversation in
the current directory
claude -c
claude -r "<session>"
or claude -r
Resume a specific session by name or ID
3. Basic use cases: Codebase exploration, Git operations
claude -r "auth
refactor"
Let us explore some simple use cases of Claude Code for codebase exploration and Git operations.
Understand the Codebase
Explain this codebase to me
Notice how Claude gives a useful high-level overview of the architecture, tech stack, and file structure —
all without you having to provide any context. You can then ask follow-ups to dive deeper into specific
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 4 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
areas, like in the following example.
Trace a Request End-to-End
Trace a request to create a new thread from the Frontend to the Backend and 
back
Claude will identify the relevant files across the frontend and backend, explain how they connect, and
summarize the flow of data and logic through the system. This is a powerful way to understand complex
interactions in codebases without having to read every line of code yourself.
Codebase as Context: 
@file
 and 
@folder
Use 
@
 mentions to focus Claude on specific files or folders:
What does @threadhive-backend\src\controllers\threadController.js 
implement?
jessicawitcher06@gmail.com
RYZ4NQ7KHB
How does @threadhive-frontend\src\reducers\threadSlice.js connect to 
@threadhive-frontend\src\services\threadService.js?
Tip: Type 
@
 and start typing a path to get autocomplete suggestions.
Using Git with Claude Code
We can use natural language commands to perform Git operations using Claude. For example,
Initialize a git repo and create a .gitignore file
and then
Make an initial commit
Notice how Claude creates an initial commit on the 
main
 branch with a helpful commit message. You can
also ask it to create branches, merge and more:
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 5 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
Create a new branch called 'ai-features'
The agent will create a new branch named 
ai-features
 and switch to it.
The agent will ask your approval before executing any Git commands, and you can review the exact
command it plans to run before confirming.
4. Permission Modes
Permission modes control how much autonomy Claude Code has when taking actions like editing files,
running commands, or interacting with external tools. By default, Claude Code operates in 
default
mode, where it can read files but must ask for permission before making any changes. However, you can
switch to more permissive modes that allow Claude to edit files or run commands without asking each
time.
Mode
What Claude can do without asking
Best for
default
Read files freely
Getting started, sensitive
codebases
acceptEdits
jessicawitcher06@gmail.com
RYZ4NQ7KHB
Read files + edit files
Iterating on code you are
actively reviewing
plan
Read files + run shell commands — no
file edits
Exploring a codebase, planning
a refactor
auto
All actions (background classifier reviews
each one)
Long-running tasks, reducing
prompt fatigue
dontAsk
Only pre-approved tools; all other
actions are auto-denied
Scripting and automation
workflows
bypassPermissions 
Everything — no checks at all
Switching Modes
Isolated containers and VMs
only
You can switch modes at any time by pressing 
Shift+Tab
 in an active session. This cycles through
default → acceptEdits → plan
 (plus 
auto
 or 
bypassPermissions
 if explicitly enabled).
You can also set a persistent default mode (in 
.claude/settings.json
) For example, to start every
session in 
acceptEdits
 mode:
{
"permissions": {
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 6 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
"defaultMode": "acceptEdits"
}
}
5. Agent Skills
Skills extend what Claude Code can do by providing specialized domain knowledge and custom
workflows. A skill is a folder with a 
SKILL.md
 file along with any supporting files that it might need like
helper scripts, sample code, etc. The 
SKILL.md
 file contains instructions that Claude adds to its toolkit
— Claude uses it automatically when relevant, or you can invoke it directly with 
/skill-name
.
Why Use Skills?
Give Claude up-to-date API documentation instead of relying on training data
Teach Claude project-specific workflows (deploy, review, migrate)
Package reusable knowledge that loads automatically when needed
The 
/skills
 command shows all installed skills.
What Is Context7?
jessicawitcher06@gmail.com
RYZ4NQ7KHB
Context7 is a documentation service that can fetch live, version-specific API docs and place them
directly into your coding session. Without it, Claude relies on training data that may reference old or
deprecated APIs. LLM can also hallucinate and generate code with non-existing functions and API
endpoints. Using Context7, Claude gets accurate, up-to-date examples straight from the source. It can
work in a CLI+Skill mode or through a MCP mode. We will use the CLI+Skill mode in this session, where
we install a skill that uses Context7 to fetch the latest Gemini API documentation.
Installing the Gemini API Skill
For this project, you will install a Google Gemini skill so Claude has access to the latest Gemini API docs
when implementing AI features. Run the following command in your terminal:
npx ctx7 skills install google-gemini/gemini-skills gemini-api-dev
This downloads the Gemini API skill into your local skills directory (in the folder .claude/skills). Review the
SKILL.md
 file to see what instructions and documentation it provides to Claude.
Verifying the Skill
Inside a Claude Code session, confirm the skill is available:
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 7 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
What skills are available?
You should see 
gemini-api-dev
 in the list. The 
/skills
 command also shows all installed skills. In
case the newly installed skill doesn't appear, try restarting the session. This will make Claude re-index the
project directory and load the new skill.
Where Skills Live
Location
Scope
~/.claude/skills/<skill-name>/SKILL.md 
All your projects (personal)
.claude/skills/<skill-name>/SKILL.md
This project only
Part 2 : AI Features in ThreadHive
jessicawitcher06@gmail.com
The project has a backend and frontend already scaffolded. You will implement the following two AI
features across two phases:
Phase 1: Thread Summary (generate a one-paragraph summary of a thread and its comments)
Phase 2: Rephrase Text (get an AI-improved version of title/body text before posting)
RYZ4NQ7KHB
Choosing a Gemini Model
There are a large number of powerful models that Google offers. See the full list at ai.google.dev/gemini
api/docs/models.
Note: Since we are using a free tier, start with a cheap but very capable model like Gemini 2.5 Flash Lite
(
gemini-2.5-flash-lite
). Keep in mind that since you are using a Free Tier API key, rate limits are low
and you may encounter 
429: Too Many Requests
 errors if you make many requests in a short period
of time. If rate limits are exceeded you will need to wait for some time before your quota is reset to make
more requests. Alternatively, you can add a small credit to your API key to get higher rate limits and
access to more powerful models.
Phase 1: Thread Summary
Let us add an AI feature that generates a one-paragraph summary of a thread and all its comments,
triggered by a button on the Thread card. This might be useful for users to quickly understand the gist of
a long discussion without reading every comment.
Step 1 — Plan
Start a session, then press 
Shift+Tab
 to cycle into Plan Mode:
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 8 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
claude
Press 
Shift+Tab
 until the status bar shows plan mode.
Let us describe the feature we want to build:
Add a Thread Summary AI feature to generate a one-paragraph summary of that 
thread and all its comments. In the page that displays a single thread, add 
a button 'Summarize' that triggers the summarization and displays the 
results below the content of the thread (and above the comment form and 
comment list).
jessicawitcher06@gmail.com
RYZ4NQ7KHB
The summary should be generated by making a API call to Gemini on the 
backend. Use the gemini api dev skill to fetch the latest documentation on 
making these API calls. Ensure that the API client is created after the 
Gemini API key is loaded.
The summarize button should show a loading state while waiting for the LLM 
response. 
Handle errors gracefully — the UI should recover if the LLM call fails.
The planning will take some time since we are asking Claude to implement a non-trivial feature. Notice
how the agent performs a detailed analysis of the codebase, and the requirements to come up with a
comprehensive implementation plan across the frontend and backend.
Review the plan carefully. Ask for clarification or adjustments if needed.
Step 2 — Implement
Claude code might prompt you to go ahead and implement its plan. If the plan looks good, proceed with
the implementation.
If not prompted by the agent, switch to your default mode and implement:
Implement the plan above.
Once the agent has generated the necessary code changes, review them carefully. Make sure you
understand the changes that were made, and ask questions if anything is unclear. Check the specific
Gemini model being used in the API call, and adjust if you want to use a different model (recommended
model: 
gemini-2.5-flash-lite
).
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 9 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
Step 3 — Test the Feature After implementing, test the feature manually by running the application and
clicking the "Summarize" button on a thread page. Verify that it shows a loading state, then displays a
summary of the thread and comments. Also test error handling by simulating an AI provider failure (e.g.,
by disconnecting from the internet) and ensuring the UI recovers gracefully.
Step 4 — Understand the AI Provider Layer
You can ask the agent for clarification on how the AI provider integration works:
Walk me through what happens when a user clicks the summarize button — from 
the React component all the way to the AI model and back. 
Step 5 — Commit
Commit the changes with a suitable message
Phase 2: Rephrase Text
jessicawitcher06@gmail.com
RYZ4NQ7KHB
Let us implement a second feature where users can get an AI-improved version of their title or body text
before posting, via a "Rephrase" button in the create-thread form and comment input.
Step 1 — Plan
In the same session, then press 
Shift+Tab
 to switch into Plan Mode:
Press 
Shift+Tab
 until the status bar shows plan mode.
Then describe the feature you want to build:
Add a rephrase text feature where users can click a 'Rephrase with AI' 
button next to their input text to get an AI-improved version of their 
text. This feature should be available when creating a thread (for the 
title and body separately) and also when writing a comment on the Thread 
page.
The rephrasing should happen on the backend by making a API call to Gemini. 
Use the gemini api dev skill to fetch the latest documentation on making 
these API calls. Ensure that the API client is created after the Gemini API 
key is loaded.
Each field should have its own loading state. Do not directly replace the 
user's text with the rephrased text. Show the rephrased text and allow the 
user to accept or reject it. Only replace the original text if the user 
Proprietary content. © Great Learning. All Rights Reserved. Unauthorized use or distribution is prohibited.
Page 10 of 11
This file is meant for personal use by jessicawitcher06@gmail.com only.
Sharing or publishing the contents in part or full is liable for legal action.
accepts the rephrased version. If the AI call fails the original text must 
stay intact (do not clear it).
Handle errors gracefully — if the AI call fails the original text must stay 
intact (do not clear it).
Like in the previous feature, review the plan carefully and ask for clarification if needed.
Then proceed with the implementation. Review the generated code changes carefully and make sure you
understand them.
If satisfied with the changes, commit them with a suitable message.
Optional Exercises — Implement the above features with OpenAI models
As an optional exercise, try switching the AI provider to OpenAI and implementing the same features
using OpenAI models instead of Gemini.
a. As a first step, use Claude Code to restructure the codebase so that the AI provider can be switched
with minimal changes. The goal is to be able to switch between Google Gemini and OpenAI later by just
changing a config value or environment variable, without touching any other part of the codebase.
jessicawitcher06@gmail.com
RYZ4NQ7KHB
b. Use Context7 or point the agent to OpenAI JS library docs to implement the refactor.
Detailed Reference
For a detailed documentation of all the features covered in this session, and more, refer to the official
Claude Code documentation: https://code.claude.com/docs