export const SPORTS_DATA = [
    {
        title: "Football",
        description: "Play football with us! Regular matches for all skill levels. Team spirit and fun guaranteed.",
        image: "/images/football.png",
        tags: ["Group", "Outdoor"],
        defaultMaxPlayers: 10, // 5v5
    },
    {
        title: "Volleyball",
        description: "Group volleyball sessions in Amman. Perfect for social interaction and fitness.",
        image: "/images/volleyball.png",
        tags: ["Group", "Indoor/Outdoor"],
        defaultMaxPlayers: 12, // 6v6
    },
    {
        title: "Kickboxing",
        description: "Intensive kickboxing training for fitness and self-defense. Private lessons also available!",
        image: "/images/Kickboxing.png",
        tags: ["Group & Private", "Indoor"],
        defaultMaxPlayers: 10,
    },
    {
        title: "Yoga",
        description: "Relaxation and flexibility through yoga sessions. For body and mind in balance.",
        image: "/images/Yoga.png",
        tags: ["Group", "Indoor"],
        defaultMaxPlayers: 10,
    },
    {
        title: "Basketball",
        description: "Dynamic basketball games with other sports enthusiasts in Amman.",
        image: "/images/basketball.png",
        tags: ["Group", "Outdoor"],
        defaultMaxPlayers: 10, // 5v5
    },
    {
        title: "Gym Training",
        description: "Professional gym training with private trainers. Personalized workout plans to achieve your fitness goals.",
        image: "/images/gym.png",
        tags: ["Private & Group", "Indoor"],
        defaultMaxPlayers: 10,
    },
];

export const SPORT_TYPES = SPORTS_DATA.map((sport) => sport.title);
