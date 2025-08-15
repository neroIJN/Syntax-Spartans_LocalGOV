// Simple brace checker - copy problematic sections here to test
const testCode = `
return (
  <DashboardLayout>
    <div>
      <div>
        {/* test */}
      </div>
    </div>
  </DashboardLayout>
)
}
`;

// Simple brace counting
let braces = 0;
let parens = 0;
let brackets = 0;

for (let char of testCode) {
  if (char === '{') braces++;
  if (char === '}') braces--;
  if (char === '(') parens++;
  if (char === ')') parens--;
  if (char === '[') brackets++;
  if (char === ']') brackets--;
}

console.log('Braces:', braces);
console.log('Parens:', parens);
console.log('Brackets:', brackets);
