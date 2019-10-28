<template lang="pug">
	.home
		.back.spacey(
			v-if='activeSlide === 1'
			@click='activeSlide -= 1'
		) BACK
		.ghost.ghost-1
		.ghost.ghost-2
		Swiper.container(
			:options='swiperConfig'
			:activeSlide='activeSlide'

			@swiper='swiper = $event'
		)
			.slide-1(slot='slide-1')
				.input
					p.label Enter your name here
					input(placeholder='Name' v-model='user')
				.button(@click='activeSlide += 1') Next
			.slide-2(slot='slide-2')
				h2 Click button below to figure out who your spooky basket will be given to
				.button(@click='findPerson') Click Here
				h2.error(v-if='err') {{ err }}
				h2(v-else) {{ receiver }}
</template>

<script>
import Swiper from '@/components/Swiper';

import { write } from '@/lib/write';

export default {
	name : 'home',

	data : () => ( {

		user     : '',
		receiver : null,

		err : null,

		swiper : null, // null be default until the component is loaded in by the parent.

		swiperConfig : {
			numberOfSlides : 2,
			config         : {
				init            : true,
				initialSlide    : 0,
				slidesPerView   : document.body.clientWidth > 500 ? 'auto' : 1,
				speed           : 400,
				spaceBetween    : 0,
				resistanceRatio : 0,
				direction       : 'horizontal',
				threshold       : 50,
				allowTouchMove  : false,
			},
		},

		activeSlide : 0,

	} ),

	methods : {

		findPerson() {

			write( this.user, ( person ) => {
				this.receiver = person;
			}, ( err ) => {
				this.err = err;
			} );

		},

	},

	components : {
		Swiper,
	}
};
</script>

<style lang="scss">
	@import '@/assets/scss/DEFAULT.scss';

	.home {
		position: relative;
		display: flex;
		flex-flow: column;
		justify-content: center;
		width: 100vw;
		height: 100%;
		background: #f2f2f2;
		overflow: hidden;

		.back {
			position: absolute;
			top: 15px;
			left: 30px;
			cursor: pointer;
			z-index: 1000;
		}

		.ghost {
			width: 300px;
			height: 300px;
			background-image: url( '../assets/giphy.gif' );
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: center;
			position: absolute;
		}

		.ghost-1 {
			transform: rotate(155deg);
			left: -300px;
			animation: goDown infinite;
			animation-duration: 60s;
		}

		.ghost-2 {
			top: 80%;
			right: -300px;
			animation: goUp infinite;
			animation-duration: 60s;
		}

		@-webkit-keyframes goDown {
			0% {
				left: -300px;
				top: 0;
			}

			20%, 100% {
				left: 300px;
				top: calc( 100% + 300px );
			}
		}

		@-webkit-keyframes goUp {
			0%, 60% {
				right: -300px;
				top: 80%;
			}

			80%, 100% {
				right: 300px;
				top: -300px;
			}
		}

		.container {
			width: 500px;
			height: 100%;
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;

			.button {
				width: 50px;
			}

			.swiper-slide {
				display: flex;
				flex-flow: column;
				justify-content: center;
			}

			.swiper-slide {

				.button {
					margin: 30px auto;
				}
			}

			.slide-1 {

				.input {
					display: flex;
					flex-flow: column;
					align-items: center;

					.label {
						color: $color-primary;
						font-size: 24px;
						font-family: 'Nunito', sans-serif;
						text-align: left;
					}

					input {
						box-shadow: $inputBoxShadow;
						padding: 10px 15px;
						border-radius: 5px;
						margin-top: 10px;
					}
				}
			}

			.slide-2 {
			}
		}
	}

	@media screen and (max-width: 450px) {
		.home {
			align-items: center;

			.container {
				margin: auto;
				width: 100%;
			}
		}
	}
</style>
