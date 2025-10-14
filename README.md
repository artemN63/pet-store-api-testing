# Pet Store API Testing

A comprehensive API testing framework built with Playwright, TypeScript, Zod for schema validation, and Faker for test data generation.

## 🚀 Features

- **Playwright** - Modern end-to-end testing framework for API testing
- **TypeScript** - Type-safe test development
- **Zod** - Runtime schema validation for API responses
- **Faker** - Dynamic test data generation
- **Dotenv** - Environment variable management
- **HTML & JSON Reports** - Comprehensive test reporting

## 📁 Project Structure

```
pet-store-api-testing/
├── tests/
│   └── example.spec.ts          # API test examples
├── schemas/
│   └── example.schema.ts        # Zod schemas for validation
├── .gitignore
├── .env                         # Environment variables
├── package.json
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── README.md
```

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://jsonplaceholder.typicode.com
```

### Playwright Configuration

The `playwright.config.ts` file includes:
- Test directory configuration
- Timeout settings
- Reporter configurations (HTML, List, JSON)
- Base URL from environment variables

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in UI mode
npm run test:ui

# Debug tests
npm run test:debug

# Show HTML report
npm run report
```

## 📝 Test Examples

The project includes comprehensive API test examples:

### GET Requests
- Fetch all users with schema validation
- Fetch single user with validation

### POST Requests
- Create new user with Faker-generated data
- Create post with dynamic content

### PUT/PATCH Requests
- Update user data
- Partial user updates

### DELETE Requests
- Delete user

### Schema Validation
- Validate response structures with Zod
- Detect invalid data structures

### Negative Testing
- Handle 404 errors
- Invalid endpoint responses

## 🎯 Schema Validation with Zod

Example schema definition:

```typescript
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;
```

Usage in tests:

```typescript
const response = await request.get('/users/1');
const user = await response.json();

const validationResult = userSchema.safeParse(user);
expect(validationResult.success).toBeTruthy();
```

## 🎲 Test Data Generation with Faker

```typescript
import { faker } from '@faker-js/faker';

const newUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};
```

## 📊 Reports

After running tests, view the HTML report:

```bash
npm run report
```

Reports are generated in:
- `playwright-report/` - HTML report
- `test-results/` - JSON results

## 🔍 Best Practices

1. **Schema Validation**: Always validate API responses using Zod schemas
2. **Dynamic Data**: Use Faker for generating test data to avoid hardcoded values
3. **Type Safety**: Leverage TypeScript types inferred from Zod schemas
4. **Error Handling**: Include negative test cases
5. **Assertions**: Validate both status codes and response structure

## 📚 Documentation

- [Playwright Documentation](https://playwright.dev/)
- [Zod Documentation](https://zod.dev/)
- [Faker Documentation](https://fakerjs.dev/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC
