let Author = canvas.tokens.get(args[0].tokenId);
let Target = Array.from(game.user.targets)[0];
let Item = args[0].item;
let ItemDocument = Author.actor.getEmbeddedDocument("Item", Item._id);
let Distance = canvas.grid.measureDistance(Author, Target)
let DidMiss = args[0].hitTargets.length === 0;
let SequencerMelee = "jb2a.dagger.melee.fire.white";
let SequencerRanged = "jb2a.dagger.throw.01.white";
let SequencerHelper = "dagger-attack";

// Check if the attack is throw or melee
if (Distance >= 3.0)
{
    // Execute sequencer effects
    let AttackFX = new Sequence()
        .effect()
            .file(SequencerRanged)
            .atLocation(Author)
            .stretchTo(Target)
            .name(SequencerHelper)
            .missed(DidMiss)
            
    await AttackFX.play();
    let [Effect] = Sequencer.EffectManager.getEffects({ name: SequencerHelper });

    // Check if it is the last dagger
    if (ItemDocument.data.data.quantity == 1) {
        // Remove the item from the inventory
        await Author.actor.deleteEmbeddedDocuments("Item", [Item._id]);
    }
    else if (ItemDocument.data.data.quantity > 1)
    {
        // Remove 1 unit of the item
        ItemDocument.update({ "data.quantity": ItemDocument.data.data.quantity - 1 });
    }
    else
    {
        ui.notifications.error("Você não possui nenhuma unidade desse item")
        console.error("Could not find any unit of the item")
    }

    // Create a copy of the item
    let ItemCopy = ItemDocument.toObject();
    ItemCopy.data.quantity = 1;
    console.log(ItemCopy);

    // Did it miss?
    if (DidMiss)
    {
        // Create array containing Item Pile items
        let ItemPileItems = [ItemCopy];

        // Get the position where the item landed
        let ItemPilePosition = 
        {
            x: Effect.targetPosition.x - 50,
            y: Effect.targetPosition.y - 50
        }

        // Create Item Pile and get token reference
        let ItemPileTokenUuid = await ItemPiles.API.createItemPile(ItemPilePosition, { items: ItemPileItems, pileActorName: false });
        let ItemPileToken = await fromUuid(ItemPileTokenUuid);

        // Set Item Pile elevation
        ItemPileToken.update({ elevation: Target.data.elevation });
    }
    else
    { 
        // Add the item to Target's inventory
        await Target.actor.createEmbeddedDocuments("Item", [ItemCopy]);
    }
}
else
{
    // Execute sequencer effects
    let AttackFX = new Sequence()
        .effect()
            .file(SequencerMelee)
		    .atLocation(Author)
		    .stretchTo(Target)
    
    AttackFX.play();
}