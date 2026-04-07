/** Matches Visit Assistant → Family Adventure (4 Hours) for Grace's chatbot flow */
export const familyAdventureItinerary = {
  title: "Family Adventure",
  duration: "4 Hours",
  stops: [
    {
      name: "Red Pandas",
      time: "10:00 AM",
      detail: "Best viewing from the lower deck while they eat — quiet voices help them stay visible longer.",
    },
    {
      name: "Elephant Encounter",
      time: "11:00 AM",
      detail: "Keeper demo at the pavilion — grab a shaded seat if you arrive a little early.",
    },
    {
      name: "Lunch Break",
      time: "12:00 PM (Suggestion)",
      detail: "Rainforest Cafe: member priority seating and 15% off your check.",
    },
    {
      name: "Lemur Forest",
      time: "1:00 PM",
      detail: "Walk-through habitat — slower pace and softer talking keeps lemurs relaxed.",
    },
    {
      name: "Sea Otters",
      time: "1:30 PM",
      detail: "Splash zone up front for kids; bring a light layer if you sit close.",
    },
    {
      name: "Giraffe Feeding",
      time: "2:15 PM",
      detail: "Hands-on feeding at Savanna Overlook — use the member check-in line when you arrive.",
    },
  ],
} as const;

export type ChatItinerary = {
  title: string;
  duration: string;
  stops: { name: string; detail: string; time?: string }[];
};
