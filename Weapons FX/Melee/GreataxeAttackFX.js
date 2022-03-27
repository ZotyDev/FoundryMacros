let Author = canvas.tokens.get(args[0].tokenId);
let Target = Array.from(game.user.targets)[0];
let SequencerMelee = "jb2a.greataxe.melee.standard.white";
let SequencerHelper = "greataxe-attack";

let AttackFX = new Sequence()
    .effect()
        .file(SequencerMelee)
		.atLocation(Author)
		.stretchTo(Target)
        .name(SequencerHelper)
		
AttackFX.play();