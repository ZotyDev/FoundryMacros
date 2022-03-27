let Author = canvas.tokens.get(args[0].tokenId);
let Target = Array.from(game.user.targets)[0];
let DidMiss = args[0].hitTargets.length === 0;
let SequencerRanged = "jb2a.bolt.physical.white"
let SequencerHelper = "handcrossbow-attack"

let AttackFX = new Sequence()
    .effect()
        .file(SequencerRanged)
		.atLocation(Author)
		.stretchTo(Target)
        .name(SequencerHelper)
		.missed(DidMiss)

await AttackFX.play();
let [Effect] = Sequencer.EffectManager.getEffects({ name: SequencerHelper });

if (DidMiss) 
{
    // Get the ammunition item
    if (args[0].item.data.consume.target == "")
    {
        console.error("Failed to get ammuntion of weapon");
    }
    else
    {
        // Create a copy of the ammunition item
        let AmmunitionID = args[0].item.data.consume.target;
        let AmmunitionRef = await Author.actor.getEmbeddedDocument("Item", AmmunitionID);
        let Ammunition = JSON.parse(JSON.stringify(AmmunitionRef));

        Ammunition.data.quantity = 1;

        // Set the location for the ItemPile
        let ItemPileItems = [Ammunition];
        
        let ItemPilePosition = 
        {
            x: Effect.targetPosition.x - 50,
            y: Effect.targetPosition.y - 50
        }

        // Create ItemPile at location
        let ItemPileTokenUuid = await ItemPiles.API.createItemPile(ItemPilePosition, {items: ItemPileItems, pileActorName: false});
        let ItemPileToken = await fromUuid(ItemPileTokenUuid);
        
        // Set ItemPile elevation
        ItemPileToken.update({elevation: Target.data.elevation});
    }
}