let Author = canvas.tokens.get(args[0].tokenId);
let Target = Array.from(game.user.targets)[0];
let SequencerMelee = "jb2a.rapier.melee.01.white";
let SequencerHelper = "rapier-attack";

let AttackFX = new Sequence()
    .effect()
        .file(SequencerMelee)
		.atLocation(Author)
		.stretchTo(Target)
        .name(SequencerHelper)
		
AttackFX.play();