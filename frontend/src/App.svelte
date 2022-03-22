<script lang="ts">
	import { onMount } from "svelte";
	import { dbos } from "./dtos/main";
	import { dbos as d } from "./dtos/shared_values";
	import {catchHandler, finallyHandler, httpGet, responseHandler} from "./modules/api";

	export let name: string;
	export let configJson: dbos.MainConfig = getUninitialisedMainConfig();
	export let wsMessages: dbos.MainConfig = getUninitialisedMainConfig();
	export let ws: WebSocket = null;


	function getUninitialisedMainConfig(): dbos.MainConfig {
		let config = new dbos.MainConfig();
		config.config_type = d.ConfigType.NOT_SET;

		return config;
	}

	function getConfigJson(): Promise<dbos.MainConfig> {
		return httpGet("/json").then(responseHandler).catch(catchHandler).then((response) => {return dbos.MainConfig.fromObject(response)} ).catch(catchHandler).finally(finallyHandler);
	}

	function getConfigBytes(): Promise<dbos.MainConfig> {
		return httpGet("/protobuf").then(responseHandler).catch(catchHandler).then((response) => dbos.MainConfig.deserializeBinary(response)).catch(catchHandler).finally(finallyHandler);
	}

	
	function connect(url: string): void {
		ws = new WebSocket(url);
		ws.onopen = onOpen;
		ws.onmessage = onMessage;
		ws.onerror = onError;
		ws.onclose = onClose;
	}
	
	//indicates that the connection is ready to send and receive data

	function onOpen(event: any): void {
		console.log("connected");
		//$("#btnConnect").html("Connected");
	}
	//An event listener to be called when a message is received from the server

	function onMessage(event: any): void {
		wsMessages = dbos.MainConfig.fromObject(JSON.parse(event.data));
	}
	//An event listener to be called when an error occurs. This is a simple event named "error".

	function onError(event: any): void {
		console.log(JSON.stringify(event.data));
	}
	//An event listener to be called when the WebSocket connection's readyState changes to CLOSED.

	function onClose(event: any): void {
		console.log(JSON.stringify(event.data));
	}

	function onRetry(event: any): void {
		console.log(JSON.stringify(event.data));
	}

	

	onMount(() => {
		name = "Philip"
		getConfigJson().then((config) => configJson = config);
		//connect("ws://127.0.0.1:3000/ws");
	})

	


</script>

<main>
	<h1>Hello {name}!</h1>
	<p>{configJson.config_type}</p>
	<p>{wsMessages.config_type}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>