// Profanity list from the following source 23/01/2015
// https://github.com/shutterstock/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/blob/master/en
var profanity = [
    /2g1c/i, /2 girls 1 cup/i, /acrotomophilia/i, /alabama hot pocket/i, /alaskan pipeline/i, 
    /anal/i, /anilingus/i, /anus/i, /arsehole/i, /ass/i, /asshole/i, /assmunch/i, /auto erotic/i, 
    /autoerotic/i, /babeland/i, /baby batter/i, /baby juice/i, /ball gag/i, /ball gravy/i, 
    /ball kicking/i, /ball licking/i, /ball sack/i, /ball sucking/i, /bangbros/i, /bareback/i, 
    /barely legal/i, /barenaked/i, /bastardo/i, /bastinado/i, /bbw/i, /bdsm/i, /beaver cleaver/i, 
    /beaver lips/i, /bestiality/i, /bi curious/i, /big black/i, /big breasts/i, /big knockers/i, 
    /big tits/i, /bimbos/i, /birdlock/i, /bitch/i, /black cock/i, /blonde action/i, 
    /blonde on blonde action/i, /blowjob/i, /blow job/i, /blow your load/i, /blue waffle/i, 
    /blumpkin/i, /bollocks/i, /bondage/i, /boner/i, /boob/i, /boobs/i, /booty call/i, 
    /brown showers/i, /brunette action/i, /bukkake/i, /bulldyke/i, /bullet vibe/i, /bung hole/i, 
    /bunghole/i, /busty/i, /butt/i, /buttcheeks/i, /butthole/i, /camel toe/i, /camgirl/i, 
    /camslut/i, /camwhore/i, /carpet muncher/i, /carpetmuncher/i, /chocolate rosebuds/i, 
    /circlejerk/i, /cleveland steamer/i, /clit/i, /clitoris/i, /clover clamps/i, /clusterfuck/i, 
    /cock/i, /cocks/i, /coprolagnia/i, /coprophilia/i, /cornhole/i, /creampie/i, /cum/i, 
    /cumming/i, /cunnilingus/i, /cunt/i, /darkie/i, /date rape/i, /daterape/i, /deep throat/i, 
    /deepthroat/i, /dendrophilia/i, /dick/i, /dildo/i, /dirty pillows/i, /dirty sanchez/i, 
    /doggie style/i, /doggiestyle/i, /doggy style/i, /doggystyle/i, /dog style/i, /dolcett/i, 
    /domination/i, /dominatrix/i, /dommes/i, /donkey punch/i, /double dong/i, 
    /double penetration/i, /dp action/i, /dry hump/i, /dvda/i, /eat my ass/i, /ecchi/i, 
    /ejaculation/i, /erotic/i, /erotism/i, /escort/i, /ethical slut/i, /eunuch/i, /faggot/i, 
    /fecal/i, /felch/i, /fellatio/i, /feltch/i, /female squirting/i, /femdom/i, /figging/i, 
    /fingerbang/i, /fingering/i, /fisting/i, /foot fetish/i, /footjob/i, /frotting/i, /fuck/i, 
    /fuck buttons/i, /fudge packer/i, /fudgepacker/i, /futanari/i, /gang bang/i, /gay sex/i, 
    /genitals/i, /giant cock/i, /girl on/i, /girl on top/i, /girls gone wild/i, /goatcx/i, 
    /goatse/i, /gokkun/i, /golden shower/i, /goodpoop/i, /goo girl/i, /goregasm/i, /grope/i, 
    /group sex/i, /g-spot/i, /guro/i, /hand job/i, /handjob/i, /hard core/i, /hardcore/i, 
    /hentai/i, /homoerotic/i, /honkey/i, /hooker/i, /hot carl/i, /hot chick/i, /how to kill/i, 
    /how to murder/i, /huge fat/i, /humping/i, /incest/i, /intercourse/i, /jack off/i, 
    /jail bait/i, /jailbait/i, /jelly donut/i, /jerk off/i, /jigaboo/i, /jiggaboo/i, /jiggerboo/i, 
    /jizz/i, /juggs/i, /kike/i, /kinbaku/i, /kinkster/i, /kinky/i, /knobbing/i, 
    /leather restraint/i, /leather straight jacket/i, /lemon party/i, /lolita/i, /lovemaking/i, 
    /make me come/i, /male squirting/i, /masturbate/i, /menage a trois/i, /milf/i, 
    /missionary position/i, /motherfucker/i, /mound of venus/i, /mr hands/i, /muff diver/i, 
    /muffdiving/i, /nambla/i, /nawashi/i, /negro/i, /neonazi/i, /nigga/i, /nigger/i, /nig nog/i, 
    /nimphomania/i, /nipple/i, /nipples/i, /nsfw images/i, /nude/i, /nudity/i, /nympho/i, 
    /nymphomania/i, /octopussy/i, /omorashi/i, /one cup two girls/i, /one guy one jar/i, 
    /orgasm/i, /orgy/i, /paedophile/i, /panties/i, /panty/i, /pedobear/i, /pedophile/i, 
    /pegging/i, /penis/i, /phone sex/i, /piece of shit/i, /pissing/i, /piss pig/i, 
    /pisspig/i, /playboy/i, /pleasure chest/i, /pole smoker/i, /ponyplay/i, /poof/i, 
    /poon/i, /poontang/i, /punany/i, /poop chute/i, /poopchute/i, /porn/i, /porno/i, 
    /pornography/i, /prince albert piercing/i, /pthc/i, /pubes/i, /pussy/i, /queaf/i, /raghead/i, 
    /raging boner/i, /rape/i, /raping/i, /rapist/i, /rectum/i, /reverse cowgirl/i, /rimjob/i, 
    /rimming/i, /rosy palm/i, /rosy palm and her 5 sisters/i, /rusty trombone/i, /sadism/i, 
    /santorum/i, /scat/i, /schlong/i, /scissoring/i, /semen/i, /sex/i, /sexo/i, /sexy/i, 
    /shaved beaver/i, /shaved pussy/i, /shemale/i, /shibari/i, /shit/i, /shota/i, /shrimping/i, 
    /skeet/i, /slanteye/i, /slut/i, /s&m/i, /smut/i, /snatch/i, /snowballing/i, /sodomize/i, 
    /sodomy/i, /spic/i, /splooge/i, /splooge moose/i, /spooge/i, /spread legs/i, /spunk/i, 
    /strap on/i, /strapon/i, /strappado/i, /strip club/i, /style doggy/i, /suck/i, /sucks/i, 
    /suicide girls/i, /sultry women/i, /swastika/i, /swinger/i, /tainted love/i, /taste my/i, 
    /tea bagging/i, /threesome/i, /throating/i, /tied up/i, /tight white/i, /tit/i, /tits/i, 
    /titties/i, /titty/i, /tongue in a/i, /topless/i, /tosser/i, /towelhead/i, /tranny/i, 
    /tribadism/i, /tub girl/i, /tubgirl/i, /tushy/i, /twat/i, /twink/i, /twinkie/i, 
    /two girls one cup/i, /undressing/i, /upskirt/i, /urethra play/i, /urophilia/i, /vagina/i, 
    /venus mound/i, /vibrator/i, /violet blue/i, /violet wand/i, /vorarephilia/i, /voyeur/i, 
    /vulva/i, /wank/i, /wetback/i, /wet dream/i, /white power/i, /women rapping/i, 
    /wrapping men/i, /wrinkled starfish/i, /xx/i, /xxx/i, /yaoi/i, /yellow showers/i, /yiffy/i, 
    /zoophilia/i
];
// Well that was educational...

// Compares word to list of profanity regular expressions
// Returns true if profanity found otherwise false
function hasProfanity (word) {
    for (var i = 0; i < profanity.length; i++) {
        if (word.search(profanity[i]) != -1) {
            return true;
        }
    }

    return false;
}
