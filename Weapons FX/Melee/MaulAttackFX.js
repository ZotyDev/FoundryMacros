let Author = canvas.tokens.get(args[0].tokenId);
let Target = Array.from(game.user.targets)[0];
let SequencerMelee = "jb2a.mace.melee.01.white.0";
let SequencerHelper = "maul-attack";

let AttackFX = new Sequence()
    .effect()
        .file(SequencerMelee)
		.atLocation(Author)
		.stretchTo(Target)
        .name(SequencerHelper)
		
AttackFX.play();