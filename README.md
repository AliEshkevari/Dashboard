# User Dashboard

A modern, responsive dashboard built with React, TypeScript, and Ant Design, using `json-server` as a mock backend. This application allows users to search, paginate, and add user data dynamically, with a clean interface styled using Tailwind CSS.

## Features
- **Dynamic Search**: Filter users by name (case-insensitive) with real-time results.
- **Pagination**: Navigate through data with configurable page sizes (3, 6, 9) using Ant Design’s `Table`.
- **Add Users**: Create new user entries (name, age, address) via a modal form, instantly updating the backend.
- **Client-Side Data Management**: Efficiently handles data fetching and pagination for a seamless user experience.
- **Extensible**: Supports additional Ant Design components like `DatePicker` for future enhancements (e.g., adding birthdates).

## Tech Stack
- **Frontend**: React, TypeScript, Ant Design, Tailwind CSS
- **Backend**: `json-server` (mock API)
- **HTTP Client**: Axios

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

- Usage

Search Users: Enter a name in the search bar (e.g., "Asal") to filter results dynamically. Clear the input to reset the table.
Paginate Data: Use the table’s pagination controls to navigate pages or adjust the page size (3, 6, or 9 records).
Add New User: Click "Add User" to open a modal, enter name, age, and address, and submit to save to db.json. The table updates if the new user matches the current search.

- Notes

ID Generation: Uses Date.now() for unique IDs; consider uuid for production.
Search: Combines json-server’s name_like (case-sensitive) with client-side case-insensitive filtering.
Pagination: Handled client-side for consistent search results across page sizes.
Error Handling: Logs errors to console; consider Ant Design’s message for user feedback.
