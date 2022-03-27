let Author = canvas.tokens.get(args[0].tokenId);
let Item = args[0].item
let ItemDocument = Author.actor.getEmbeddedDocument("Item", Item._id);

// Macro options
let ItemBrightLight = 6;
let ItemDimLight = 12;
let ItemAnimationType = "torch";
let ItemLightColor = "#ffae00";
let ItemLightAlpha = 0.4;
let ItemUnlitImage = "icons/sundries/lights/torch-black.webp";
let ItemLitImage = "icons/sundries/lights/torch-brown-lit.webp";
let ItemTaggerHelper = "normal_torch_lit";

if (Tagger.hasTags(Author, ItemTaggerHelper)) 
{
    Author.document.update({ "light.bright": 0 });
    Author.document.update({ "light.dim": 0 });
    Author.document.update({ "light.animation.type": null });
    ItemDocument.update({ "img": ItemUnlitImage });

    Tagger.removeTags(Author, ItemTaggerHelper);
}
else if (Author.data.light.animation.type == undefined || Author.data.light.animation.type == null)
{
    Author.document.update({ "light.bright": ItemBrightLight });
    Author.document.update({ "light.dim": ItemDimLight });   
    Author.document.update({ "light.animation.type": ItemAnimationType });
    Author.document.update({ "light.color": ItemLightColor });
    Author.document.update({ "light.alpha": ItemLightAlpha });
    ItemDocument.update({ "img":  ItemLitImage });

    Tagger.addTags(Author, ItemTaggerHelper);
}
else
{
    ui.notifications.error("Desative o outro item provendo luz antes de ativar esse");
}