/**
 * Base Converter
 * Convert between number bases
 *
 * Online tool: https://devtools.at/tools/base-converter
 *
 * @packageDocumentation
 */

function convertToBase(value: string, fromBase: Base, toBase: Base): string {
  if (!value.trim()) return "";

  try {
    // Handle negative numbers
    const isNegative = value.startsWith("-");
    const absoluteValue = isNegative ? value.slice(1) : value;

    // Convert from source base to decimal (BigInt handles large numbers)
    const decimalValue = BigInt(parseInt(absoluteValue, fromBase));

    // Convert from decimal to target base
    const result = decimalValue.toString(toBase).toUpperCase();

    return isNegative ? "-" + result : result;
  } catch {
    return "";
  }
}

function validateInput(value: string, base: Base): boolean {
  if (!value.trim()) return true;

  // Handle negative sign
  const testValue = value.startsWith("-") ? value.slice(1) : value;
  if (!testValue) return true;

  const config = BASE_CONFIGS.find(c => c.value === base);
  return config ? config.validChars.test(testValue) : false;
}

// Export for convenience
export default { encode, decode };
