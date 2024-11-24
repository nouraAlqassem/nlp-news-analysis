import { handleSubmit } from "../src/client/js/formHandler";

document.body.innerHTML = `
    <form id="url-form">
        <input type="text" id="url-input" value="" />
        <button type="submit">Analyze</button>
    </form>
    <div id="results" style="display: none;">
        <p>Polarity: <span id="polarity"></span></p>
        <p>Subjectivity: <span id="subjectivity"></span></p>
        <p>Source: <span id="source"></span></p>
        <p>Summary: <span id="summary"></span></p>
        <p>Entities: <span id="entities"></span></p>
        <p>Categories: <span id="categories"></span></p>
        <p>Keywords: <span id="keywords"></span></p>
    </div>
`;

global.alert = jest.fn();
global.fetch = jest.fn();

describe("Testing handleSubmit functionality", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Displays alert for invalid URL", async () => {
        const event = { preventDefault: jest.fn() };
        document.getElementById("url-input").value = "not-a-url";
        
        await handleSubmit(event);

        expect(alert).toHaveBeenCalledWith("Please enter a valid URL");
        expect(fetch).not.toHaveBeenCalled();
    });

    test("Calls fetch for valid URL", async () => {
        const event = { preventDefault: jest.fn() };
        document.getElementById("url-input").value = "https://www.example.com";

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                polarity: "positive",
                subjectivity: "objective",
                source: "Example Source",
                summary: "Example Summary",
                entities: "Entity1, Entity2",
                categories: "Category1, Category2",
                keywords: "Keyword1, Keyword2",
            }),
        });

        await handleSubmit(event);

        expect(fetch).toHaveBeenCalledWith("http://localhost:8081/analyze", expect.anything());
        expect(document.getElementById("polarity").innerText).toBe("positive");
    });
});
