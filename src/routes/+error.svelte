<script context="module">
	import error404 from '$assets/404-error.png'
	import logo from '$assets/luma-logo.png';

	export let error;
	export let status;
</script>

<div class="background">
	<div class="card-container">
		<img src={error404} alt="luma-logo"/>
		<div class="content">
			<p>Oops!</p>
			<p>The page you're looking for does not exist.</p>
			<a href="/" class="back-home">Go back to the homepage</a>
		</div>
	</div>
</div>

<style>
		:global(body){
				margin: 0;
		}

		.background{
				height: 100vh;
				display: flex;
				overflow: hidden;
				align-items: center;
				justify-content: center;
        background: linear-gradient(to right, #7c3aed, #ec4899);
    }

		.card-container{
				border: 1px solid black;
				background-color: white;
				padding: 4rem;
				border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
				display: flex;
				gap: 4rem;
		}

		.card-container img{
				width: 300px;
		}

		.content{
				width: 400px;
				align-items: center;
		}

    .content p:first-child{
        font-size: 3rem;
    }

		.content p{
				font-size: 1.5rem;
		}

    .back-home {
        display: inline-block;
        margin-top: 20px;
        font-size: 1.2rem;
        color: #692DD7;
        text-decoration: none;
    }
</style>
