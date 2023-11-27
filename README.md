A simple adventure game by Jalen Suwa based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Dungeon Entrance, Dungeon Tunnel, Secret Stash, Witch's Lair, Treasure Room..
- **2+ scenes *not* based on `AdventureScene`**: Treasure Room, Dungeon Tunnel.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - showTitleMessage: used to show a message in the right bar and keep it there as long as the user is in that room

Experience requirements:
- **4+ locations in the game world**: Dungeon Entrance, Dungeon Tunnel, Secret Stash, Witch's Lair, Treasure Room.
- **2+ interactive objects in most scenes**: 2 Examples include the witch (she disappears and reappears in a random location) the other example is the bucket, it has a pick up animation and is tracked by the inventory.
- **Many objects have `pointerover` messages**: every object in the game has a pointerover message
- **Many objects have `pointerdown` effects**: when clicked, obtainable items have animations, when the witch is clicked and she dies then she has a death animation.
- **Some objects are themselves animated**: the witch moves when moused over, items that are obtainable move.

Asset sources:
- All images used were emojis

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
