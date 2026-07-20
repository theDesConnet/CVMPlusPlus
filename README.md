# CVM++

An experimental, unofficial web client for [CollabVM](https://computernewb.com/collab-vm/), built with React and TypeScript.

CVM++ was created as an alternative interface for browsing and controlling shared virtual machines on CollabVM. The project focuses on real-time communication with CollabVM servers, rendering the remote display in the browser, and providing the core collaborative features of the platform.

> [!IMPORTANT]
> This project is archived and unfinished. It targets an older CollabVM implementation and may no longer connect to the current service. The repository is preserved as a portfolio and learning project.

## Features

Implemented or partially implemented features include:

- CollabVM server discovery and virtual machine selection
- Real-time WebSocket communication
- Encoding and decoding of Guacamole-style protocol messages
- Remote screen rendering with the Canvas API
- Shared control queue and turn state
- User list and username changes
- Real-time chat
- Vote handling
- Reusable client-side classes for VM, chat, users, turns, votes, display, and WebSocket communication
- Global selected-VM state through React Context

Some interface actions and edge cases remain incomplete.

## Tech stack

- React 18
- TypeScript
- Create React App
- WebSocket
- Canvas API
- React Context and Hooks
- EventEmitter-based client architecture
- Axios

## Project structure

```text
src/
├── components/          # React UI components
│   ├── VMChat.tsx
│   ├── VMControl.tsx
│   ├── VMList.tsx
│   ├── VMUserList.tsx
│   ├── VMView.tsx
│   └── VMVoteControl.tsx
├── context/             # Shared React state
│   └── CurrentVM.tsx
├── cvmclient/           # CollabVM client and protocol logic
│   ├── GuacUtils.ts
│   ├── VM.ts
│   ├── VMChat.ts
│   ├── VMDisplay.ts
│   ├── VMTurn.ts
│   ├── VMUser.ts
│   ├── VMVote.ts
│   └── VMWebSocket.ts
├── app.tsx
├── config.json
└── index.tsx
```

## How it works

The client opens a WebSocket connection to a CollabVM server using the `guacamole` subprotocol. Incoming protocol messages are decoded and converted into application events such as:

- `screen` — draw a received image fragment on the canvas
- `size` — update the remote display dimensions
- `chat` — display a new chat message
- `adduser` / `remuser` — update the connected-user list
- `turn` — update the control queue
- `vote` — update the current vote state
- `list` — receive the available virtual machine list

The React interface subscribes to these events and updates the corresponding components.

## Running locally

The frontend can still be installed and started locally:

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

A production build can be created with:

```bash
npm run build
```

### Compatibility notice

The server addresses and authentication endpoint are configured in `src/config.json`. They were written for the CollabVM infrastructure available during development. Because the service and its protocol may have changed, successful connection to current servers is not guaranteed.

Running the interface locally does not mean that remote VM functionality will work without adapting the networking and protocol code.

## Project status

Development has stopped. The project is kept public to demonstrate work with:

- a non-trivial React and TypeScript application
- real-time WebSocket events
- a custom network protocol
- browser canvas rendering
- separation between UI components and client-side service classes

## Known limitations

- The project is unfinished.
- Current CollabVM compatibility has not been verified.
- Some controls are placeholders or partially implemented.
- Error handling and reconnect behavior need improvement.
- Event subscriptions require more consistent cleanup.
- Automated tests are not implemented.
- The original Create React App toolchain is outdated.

## Disclaimer

CVM++ is an independent, unofficial project. It is not affiliated with, endorsed by, or maintained by Computernewb or the CollabVM project.