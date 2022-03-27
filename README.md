# FoundryVTT Special Effects (and utilities) Macros
This is a set of macros that I made for my personal game, and since I made huge effort to make them cool I decided to share the scripts so everyone can experience the same :D

Everything here is absolutely, completely, 100% free, but if you want to support me here is my [Patreon](https://www.patreon.com/zoty)

## Some of the features:
- Thrown weapons switch between ranged and melee based on distance
- Throwing a weapon removes it from your inventory
- Thrown weapons that you hit get added to the target's inventory
- Projectiles that you miss are dropped on ground
- When you activate a torch from your inventory the image will change to a lit one
- Torch also configure the light of the owner token

## !! The only system supported is D&D5e

### Requirements:
- Advanced Macros
- Sequencer
- ItemPiles
- Tagger
- Midi-QoL
- Levels

The above list is also a suggestion, if you do not use these you might take a look

### How to use:
First, create a macro inside your game, the name can be enything but I recommend using a name similar to the name of the macro.

Now go to the item that is going to call the macro and place the name of the macro here:

![](images/MacroLocation.png)

Next select when the macro is going to be called:

![](images/MacroCall.png)

Note that the macro call depends on the type of the item. Here is a table to help you selecting the right one:

| ItemType                  | Call Type                        |
|---------------------------|----------------------------------|
| Weapons                   | After Attack Roll                |
| Utility (no dices rolled) | Called before the item is rolled |

(Also, the table above may not be the best way, and if you want you can tinker around to see if another option suits your game better)

## Language
The scripts provided here have UI notifications in Brazillian Portuguese, for now I'm not going to search a way to translating anything since the files here are only scripts, but if you want notifications in another language you can just change the text, nothing is going to break. Btw everything aside notifications is in English.