<script>

</script>

<div class="content">
	<p class="title">Idioma</p>

	<div class="container">
		<label for="language">Preferencias de idioma</label>
		<select id="language">
			{#each [1,2,3,4,5,6] as value}
				<option value={value}>  {value} </option>
			{/each}
		</select>

		<div class="btn-wrapper">
			<button>
				GUARDAR
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