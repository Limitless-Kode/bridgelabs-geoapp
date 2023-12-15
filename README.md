# Bridgelabs Geo App

This is a React and TypeScript project that uses Next.js for server-side rendering. 
A simple Country information app that uses the [GraphQL Countries API](https://countries.trevorblades.com/graphql) 
to display information about countries. And also uses the [Rapid Geography API](https://geography4.p.rapidapi.com/apis/geography/v1)
to get the country detailed information.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- pnpm

### Installing

1. Clone the repository
```sh
git clone https://github.com/Limitless-Kode/bridgelabs-geoapp.git
```
2. Install dependencies
```sh
pnpm install
```

### Running the Application

To start the development server, run:

```sh
pnpm run dev
```

## Code Overview

### src/

This directory contains the main application code.

- `app/`: Contains global styles and layout components.
- `components/`: Contains reusable components.
- `helpers/`: Contains helper functions for formatting and time-related utilities.
- `hooks/`: Contains custom React hooks for getting api query data and country details.
- `providers/`: Contains the GraphQL provider.

### public/

This directory contains public assets like `features.json`.

## Built With

- [React](https://react.dev) - The web framework used
- [TypeScript](https://www.typescriptlang.org) - Static typing for JavaScript
- [Next.js](https://nextjs.org) - The React framework for production


## Authors

- **Peter Claver Amobila** - *Initial work* - [Limitless-Kode](https://github.com/Limitless-Kode)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details