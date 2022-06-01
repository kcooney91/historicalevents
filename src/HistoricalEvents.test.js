import HistoricalEvents, { fetchHandler } from "./HistoricalEvents";

describe("Test <HistoricalEvents /> rendering", () => {
  it("Should component <HistoricalEvents /> be defined", () => {
    expect(HistoricalEvents).toBeDefined();
  });
});

describe("Test API Call", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ ok: "200", response: { count: "1000" } }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("Checks response, data and URL", async () => {
    const limit = 500;
    const offset = 500;
    const rate = await fetchHandler(limit, offset);

    expect(rate.ok).toEqual("200");
    expect(rate.response.count).toEqual("1000");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://www.vizgr.org/historical-events/search.php?format=json&begin_date=19001231&end_date=20151231&lang=en&limit=${limit}&offset=${offset}`
    );
  });

  it("Returns exception that the API is down", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    const rate = await fetchHandler();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(rate).toEqual("There is something wrong with the API");
  });
});
