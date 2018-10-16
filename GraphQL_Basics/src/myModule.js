// Named Export method
const message = "information from my module"
const name = "Adrian Pearman"
const location = "Toronto"
const greeting = (name) => {
  return `Welcome to the course, ${name}`
}

export { message, name, greeting, location as default }