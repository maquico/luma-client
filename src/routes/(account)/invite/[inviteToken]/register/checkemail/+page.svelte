<script>
	import image from '$lib/assets/checkemail-img.png';
	import { ChevronLeft } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/translations';

	$: inviteToken = $page.params.inviteToken;
</script>

<div class="checkemail-container">
	<div class="card checkemail">
		<div class="text-section">
			<h1>{$t('checkEmail.check_email')}</h1>
			<p>
				{$t('checkEmail.instruction_1')}
			</p>
			<p>
				{$t('checkEmail.instruction_2')}
			</p>
			<p>
				{$t('checkEmail.instruction_3')}
			</p>
			<hr />
			<div class="button-container">
				<ChevronLeft class="chevron-icon" />
				<a href="/invite/{inviteToken}/login" class="btn-secondary"> {$t('checkEmail.back_button')} </a>
			</div>
		</div>
		<div class="divider"></div>
		<div class="image-section">
			<img src={image} alt="Check Email Image" />
		</div>
	</div>
</div>

<style>
	.checkemail-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.checkemail {
		width: 600px;
		background-color: white;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: row;
		padding: 20px;
		gap: 20px;
	}

	.text-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

	.text-section h1 {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 30px;
		color: black;
	}

	.text-section p {
		font-size: 15px;
		margin: 0 auto;
		max-width: 300px;
		margin-bottom: 20px;
		color: black;
	}

	.divider {
		width: 1px;
		height: 355px;
		background-color: lightgray;
	}

	.image-section {
		display: flex;
		align-items: center;
	}

	.image-section img {
		width: 200px;
		height: 250px;
		object-fit: contain;
		border-radius: 10px;
	}

	.button-container {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
		margin-top: 20px;
		width: 100%;
		text-align: left;
	}

	.chevron-icon {
		width: 24px;
		height: 24px;
		color: #692dd7;
	}
</style>
