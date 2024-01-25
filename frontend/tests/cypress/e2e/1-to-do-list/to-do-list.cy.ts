type ToDoItem = {
    description: string;
    done: boolean;
};

describe("example to-do app", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should test the to-do list page behavior", () => {
        cy.fixture("to-do-list.json").then((data: ToDoItem[]) => {
            // create first to-do item
            cy.get("[data-testid='add-button']").click();
            cy.get("[data-testid='resizable-input-content']")
                .last()
                .type(data[0].description);
            cy.get("[data-testid='to-do-item']").should("have.length", 1);

            // create second to-do item
            cy.get("[data-testid='add-button']").click();
            cy.get("[data-testid='resizable-input-content']")
                .last()
                .type(data[1].description);
            cy.get("[data-testid='to-do-item']").should("have.length", 2);

            // create third to-do item
            cy.get("[data-testid='add-button']").click();
            cy.get("[data-testid='resizable-input-content']")
                .last()
                .type(data[2].description);
            cy.get("[data-testid='to-do-item']").should("have.length", 3);

            // delete first to-do item
            cy.get("[data-testid='to-do-delete-button']").first().click({
                force: true,
            });
            cy.get("[data-testid='to-do-item']").should("have.length", 2);

            // delete second to-do item
            cy.get("[data-testid='to-do-delete-button']").first().click({
                force: true,
            });

            // delete third to-do item
            cy.get("[data-testid='to-do-delete-button']").first().click({
                force: true,
            });

            // check that the to-do list is empty
            cy.get("[data-testid='to-do-item']").should("not.exist");
        });
    });
});
