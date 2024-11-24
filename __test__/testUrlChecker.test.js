import { isValidUrl } from "../src/client/js/urlChecker";

describe("Testing URL validation functionality", () => {
    test("Valid URL returns true", () => {
        const validURL = "https://www.example.com";
        expect(isValidUrl(validURL)).toBe(true);
    });

    test("Invalid URL returns false", () => {
        const invalidURL = "not-a-url";
        expect(isValidUrl(invalidURL)).toBe(false);
    });

    test("Empty string returns false", () => {
        const emptyString = "";
        expect(isValidUrl(emptyString)).toBe(false);
    });

    test("URL without protocol returns false", () => {
        const noProtocolURL = "www.example.com";
        expect(isValidUrl(noProtocolURL)).toBe(false);
    });
});
