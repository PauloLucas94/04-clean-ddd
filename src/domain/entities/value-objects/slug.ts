export class Slug {
    public value: string
    constructor(value: string) {
        this.value=value
    }
    /**
     * Recieves a string and returns a Slug object
     * 
     * Example: "An example title" -> "an-example-title"
     * @param text {string}
     */

    static createFromText(text: string) {
        const slugText = text
            .normalize("NFKD")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '')

        return new Slug(slugText)
    }
} 