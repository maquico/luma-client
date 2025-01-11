<script>
	import { t, locale, locales } from '$lib/translations';
	import { showToast } from '$lib/stores/toastStore';
	import axios from 'axios';
	
	const userData = JSON.parse(localStorage.getItem('sb-kyttbsnmnrayejpbxmpp-auth-token'))
	const userID = userData.user.id

	const handleChange = async ({ currentTarget }) => {
		const { value } = currentTarget;

		let languageId = 0;
		if (value === 'en') {
			languageId = 4;
		} else if (value === 'es') {
			languageId = 3;
		} else {
			console.log("Not valid language selected, defaulting to English");
			languageId = 4;
		}

		// Call the put request to update the user's language
		await axios
    	.put(`https://luma-server.onrender.com/api/user/lang/${userID}`, {
    	    Idioma_ID: languageId
    	})
    	.then((response) => {
    	    console.log('Prefered Language Updated:', response.data);
    	    showToast($t('profile_config_lang.update_success'), { type: 'success', duration: 5000 });
    	})
    	.catch((error) => {
    	    console.error('Error updating language preference:', error);
		
    	    if (error.response) {
    	        // Check if the status code is 400
    	        if (error.response.status === 400 || error.response.status === 403) {
    	            showToast(error.response.data, { type: 'warning', duration: 5000 });
    	            return;
    	        }
    	    }
		
    	    // Generic error toast
    	    showToast($t('profile_config_lang.update_error'), { type: 'error', duration: 5000 });
		});

		document.cookie = `lang=${value}; path=/;`;
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

		<!--<div class="btn-wrapper">
			<button>
				{$t('profile_config_lang.langUI_button')}
			</button>
		</div>
		-->
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