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
    cy.get("input[name='firstName']").type("Name");
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
});
