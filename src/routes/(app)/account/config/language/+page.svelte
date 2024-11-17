<script>
	import { t, locale, locales } from '$lib/translations';

	const handleChange = ({ currentTarget }) => {
		const { value } = currentTarget;

		document.cookie = `lang=${value} ;`;
	};
</script>

<div class="content">
	<p class="title">{$t('profile_config_lang.langUI_title')}</p>

	<div class="container">
		<label for="language">{$t('profile_config_lang.langUI_input_text')}</label>
		<select bind:value="{$locale}" on:change={handleChange}>
			{#each $locales as value}
				<option value="{value}" selected="{$locale === value}">{$t(`lang.${value}`)}</option>
			{/each}
		</select>

<!--		<select id="language">-->
<!--			{#each [1, 2, 3, 4, 5, 6] as value}-->
<!--				<option value={value}>  {value} </option>-->
<!--			{/each}-->
<!--		</select>-->

		<div class="btn-wrapper">
			<button>
				{$t('profile_config_lang.langUI_button')}
			</button>
		</div>
	</div>
</div>

<style>
    .content{
        display: flex;
        flex-direction: column;
				/*background-color: lightcoral;*/
    }

    .content .title{
        font-size: var(--luma-h4-font-size);
    }

		.container{
				padding-top: 1rem;
				width: 30%;
				display: flex;
				flex-direction: column;
				gap: var(--luma-half-element-spacing);
		}

		.container select{
				padding: var(--luma-half-element-spacing);
				border-radius: 8px;
		}

		.btn-wrapper{
				display: flex;
				width: 100%;
				justify-content: end;
		}

		.container button{
				background-color: var(--luma-color-primary-violet);
				border-radius: 8px;
				font-size: 0.8rem;
				padding: var(--luma-half-element-spacing) var(--luma-element-spacing);
				color: white;
		}
</style>