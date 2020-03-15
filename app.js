new Vue({
    el: '#game',
    data: {
        player: {
            hp: 100,
            power: 5,
            attack(especial) {
                return Math.floor(Math.random() * (especial ? this.power + 10 : this.power)) + 5;
            },
            heal() {
                return Math.floor(Math.random() * (this.power + 5)) + 5;
            },
        },
        monster: {
            hp: 100,
            power: 8,
            attack() {
                return Math.floor(Math.random() * this.power) + 5;
            },
        },
        msgColor: 'text-default',
        fighting: false,
        runAway: false,
        turns: []
    },
    computed: {
        done() {
            return this.player.hp <= 0 || this.monster.hp <= 0 || this.runAway;
        },
        message() {
            let message;
            if (this.player.hp <= 0) {
                this.msgColor = 'text-danger';
                message = 'You lose! :(';
            } else if (this.monster.hp <= 0) {
                this.msgColor = 'text-success';
                message = 'You win! \\o/';
            } else if (this.runAway) {
                this.msgColor = 'text-secondary';
                message = 'Are you a coward? ¬¬';
            } else if (this.fighting == false) {
                this.msgColor = 'text-primary';
                message = 'Are you ready?';
            } else {
                this.msgColor = 'text-warning';
                message = 'Go on, fight!';
            }

            return message;
        },
    },
    methods: {
        init() {
            this.fighting = true;
        },
        attack(event, especial = false) {
            const pAtk = this.player.attack(especial);
            const mAtk = this.monster.attack();
            let log = [];

            this.monster.hp = Math.max(this.monster.hp - pAtk, 0);
            log.push({
                msg: 'You hit the monster with ' + pAtk + ' damage.',
                class: especial ? 'primary' : 'warning'
            });

            this.player.hp = Math.max(this.player.hp - mAtk, 0);
            log.push({
                msg: 'The monster hit you with ' + mAtk + ' damage.',
                class: 'danger'
            });

            this.turns.unshift(log);
        },
        heal() {
            const pHeal = this.player.heal();
            const mAtk = this.monster.attack();
            let log = [];

            this.player.hp = Math.min(this.player.hp + pHeal, 100);
            log.push({
                msg: 'You have healed ' + pHeal + ' HP.',
                class: 'success'
            });

            this.player.hp = Math.max(this.player.hp - mAtk, 0);
            log.push({
                msg: 'The monster hit you with ' + mAtk + ' damage.',
                class: 'danger'
            });

            this.turns.unshift(log);
        },
        run() {
            this.runAway = true;
        },
        reset() {
            this.player = {
                    hp: 100,
                    power: 5,
                    attack(especial) {
                        console.log(this.power);
                        return Math.floor(Math.random() * (especial ? this.power + 10 : this.power)) + 5;
                    },
                    heal() {
                        return Math.floor(Math.random() * (this.power + 5)) + 5;
                    },
                };

            this.monster = {
                    hp: 100,
                    power: 8,
                    attack() {
                        return Math.floor(Math.random() * this.power) + 5;
                    }
                };

            this.fighting = false;

            this.runAway = false;

            this.turns = [];
        },
    }
})
