/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("renders the home page", () => {
  it("renders correctly", () => {
    cy.visit("/");

    cy.contains("Welcome");
  });
});

describe("login page", () => {
  it("login page loads", () => {
    cy.visit("/login");

    cy.contains("Login");
  });

  it("login fails", () => {
    cy.get("form").submit();

    cy.contains("Please fill in the required fields");
  });

  it("login fails creds", () => {
    cy.get("[name='username']").type("username");
    cy.get("[name='password']").type("password");

    cy.get("form").submit();

    cy.contains("Invalid credentials");
  });

  it("login success", () => {
    cy.get("[name='username']").type("mail@mail.com");
    cy.get("[name='password']").type("password1!");

    cy.get("form").submit();

    cy.url().should("contain", "/adresar");
  });
});

describe("address book", () => {
  it("create contact fails", () => {
    cy.get("button").contains("New contact").click();

    cy.url().should("contain", "/kontakt");

    cy.get("form").submit();

    cy.contains("Please fill in the required fields");
  });

  it("create contact fails email regex", () => {
    cy.get("input[name='firstName']").type("firstName");
    cy.get("input[name='lastName']").type("lastName");
    cy.get("input[name='dateOfBirth']").type("1999-01-01");
    cy.get(".ui.form .field>.selection.dropdown").click();
    cy.get("input[name='contact']").should("be.disabled");
    cy.get("div[role='option']").contains("E-mail").click();
    cy.get("input[name='contact']").should("be.enabled");
    cy.get("input[name='contact']").type("test@test");

    cy.get("form").submit();

    cy.contains("E-mail must be valid");
  });

  it("create contact succeeds", () => {
    cy.get("input[name='contact']").clear();
    cy.get("input[name='contact']").type("test@test.com");

    cy.get("form").submit();

    cy.url().should("contain", "/adresar");
  });

  it("address book contains created contact", () => {
    cy.get("a[aria-label='Last item']").click();

    cy.contains("test@test.com");
  });

  it("open contact details", () => {
    cy.get("a").contains("test@test.com").click();

    cy.url().should("contain", "/kontakt/detalji");
    cy.contains("test@test.com");
  });

  it("update contact", () => {
    cy.get("button").contains("Update").click();

    cy.url().should("contain", "/kontakt");

    cy.get("input[name='contact'").clear();
    cy.get("input[name='contact'").type("new@mail.com");

    cy.get("form").submit();

    cy.url().should("contain", "/adresar");
  });

  it("address book contains updated contact", () => {
    cy.get("a[aria-label='Last item']").click();

    cy.contains("new@mail.com");
  });

  it("favorite contact", () => {
    const favIcon = cy.get("i.star.outline.icon").last();
    favIcon.click();

    favIcon.should("not.have.class", "outline");
  });

  it("create another contact", () => {
    cy.get("button").contains("New contact").click();

    cy.get("input[name='firstName']").type("firstName");
    cy.get("input[name='lastName']").type("lastName");
    cy.get("input[name='dateOfBirth']").type("1999-01-01");
    cy.get(".ui.form .field>.selection.dropdown").click();
    cy.get("div[role='option']").contains("E-mail").click();
    cy.get("input[name='contact']").type("test@test.com");

    cy.get("form").submit();
  });

  it("search functions correctly", () => {
    cy.get("input").type("new@mail");

    cy.get("form").submit();

    cy.contains("test@test.com").should("not.exist");
  });

  it("favorites sites should contain only favorites", () => {
    cy.wait(500);

    cy.get("button").contains("Favorites").click();

    cy.get("tbody i.star.outline.icon").should("not.exist");
  });

  it("unfavorite contact", () => {
    const favIcon = cy.get("i.star.icon").last();
    favIcon.click();

    favIcon.should("have.class", "outline");
  });

  it("delete contact", () => {
    cy.get("button").contains("Address book").click();

    cy.wait(500);

    cy.get("a").contains("new@mail.com").click();

    cy.wait(500);

    cy.get("button").contains("Delete").click();
  });

  it("address book shouldn't contain deleted contact", () => {
    cy.wait(500);
    cy.get("a[aria-label='Last item']").click();

    cy.get("a").contains("new@mail.com").should("not.exist");
  });

  it("delete other contact", () => {
    cy.get("a").contains("test@test.com").click();

    cy.wait(500);

    cy.get("button").contains("Delete").click();
  });
});

describe("logout", () => {
  it("logout", () => {
    cy.get("button").contains("Log out").click();

    cy.contains("Login");
  });
});
