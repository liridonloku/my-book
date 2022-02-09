import calculateTime from "../calculateTime";

describe("Time passed since a post/comment is calculated correctly", () => {
  it("Shows 2 years ago if post is older than 2 years", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2024, 1, 1))).toBe(
      "2 years ago"
    );
  });
  it("Shows 1 year ago if post is older than 1 year", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2023, 1, 1))).toBe(
      "1 year ago"
    );
  });
  it("Shows 5 months ago if post is older than 5 months", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2022, 6, 5))).toBe(
      "5 months ago"
    );
  });
  it("Shows 1 month ago if post is older than 1 month", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2022, 2, 3))).toBe(
      "1 month ago"
    );
  });
  it("Shows 2 weeks ago if post is older than 2 weeks", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2022, 1, 16))).toBe(
      "2 weeks ago"
    );
  });
  it("Shows 1 week ago if post is older than 1 week", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2022, 1, 8))).toBe(
      "1 week ago"
    );
  });
  it("Shows 3 days ago if post is older than 3 days", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2022, 1, 4))).toBe(
      "3 days ago"
    );
  });
  it("Shows 1 day ago if post is older than 1 day", () => {
    expect(calculateTime(new Date(2022, 1, 1), new Date(2022, 1, 2))).toBe(
      "1 day ago"
    );
  });
  it("Shows 5 hours ago if post is older than 5 hours", () => {
    expect(
      calculateTime(new Date(2022, 1, 1, 1), new Date(2022, 1, 1, 6))
    ).toBe("5 hours ago");
  });
  it("Shows 1 hour ago if post is older than 1 hour", () => {
    expect(
      calculateTime(new Date(2022, 1, 1, 1), new Date(2022, 1, 1, 2))
    ).toBe("1 hour ago");
  });
  it("Shows 20 minutes ago if post is older than 20 minutes", () => {
    expect(
      calculateTime(new Date(2022, 1, 1, 1, 1), new Date(2022, 1, 1, 1, 21))
    ).toBe("20 minutes ago");
  });
  it("Shows 1 minute ago if post is older than 1 minute", () => {
    expect(
      calculateTime(new Date(2022, 1, 1, 1, 1), new Date(2022, 1, 1, 1, 2))
    ).toBe("1 minute ago");
  });
  it("Shows just now if post is less than 1 minute old", () => {
    expect(
      calculateTime(
        new Date(2022, 1, 1, 1, 1, 1),
        new Date(2022, 1, 1, 1, 1, 45)
      )
    ).toBe("just now");
  });
});
