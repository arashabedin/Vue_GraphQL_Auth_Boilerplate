const url = process.env.CLIENT_URL
const fromEmail = process.env.FROM_EMAIL

module.exports.welcomeEmail = function(email, user) {
  const text = `
Hi,
Thank you for the registration
Please vonfirm your email via the following link:\n
${url}/signup/${user.id}
`

  return {
    to: `${email}`,
    from: {
      address: fromEmail,
      name: 'Vue GraphQL Authentication'
    },
    subject: 'Please verify your email!',
    text
  }
}