import type { LoadableData } from '$lib/network/types';
import type { BrandedId } from '$lib/utils/branding';

export type ApiChatMessage = {
	comment: unknown;
	data: unknown;
	issue: boolean;
	outdated: boolean;
	resolved: boolean;
	uuid: string;
	created_at: string;
	updated_at: string;
	chattable_id: string;
	thread_id: string;
	user_id: number;
};

export type ChatMessage = {
	comment: unknown;
	data: unknown;
	issue: boolean;
	outdated: boolean;
	resolved: boolean;
	uuid: string;
	createdAt: string;
	updatedAt: string;
	chattableId: string;
	threadId: string;
	userId: number;
};

type ChatChannelId = BrandedId<'ChatChannelId'>;

export type ChatChannel = {
	/**
	 * The unique identifier of the chat channel.
	 *
	 * Built from the project ID and the change ID.
	 */
	id: ChatChannelId;
	projectId: string;
	changeId?: string;
	messages: ChatMessage[];
};

export function createChannelKey(projectId: string, changeId: string | undefined): ChatChannelId {
	if (changeId === undefined) {
		return projectId as ChatChannelId;
	}
	return `${projectId}:${changeId}` as ChatChannelId;
}

export type LoadableChatChannel = LoadableData<ChatChannel, ChatChannel['id']>;

export function apiToChatMessage(apiChatMessage: ApiChatMessage): ChatMessage {
	return {
		comment: apiChatMessage.comment,
		data: apiChatMessage.data,
		issue: apiChatMessage.issue,
		outdated: apiChatMessage.outdated,
		resolved: apiChatMessage.resolved,
		uuid: apiChatMessage.uuid,
		createdAt: apiChatMessage.created_at,
		updatedAt: apiChatMessage.updated_at,
		chattableId: apiChatMessage.chattable_id,
		threadId: apiChatMessage.thread_id,
		userId: apiChatMessage.user_id
	};
}

export type ApiCreateChatMessageParams = {
	/**
	 * Branch ID
	 */
	branch_id: string;
	/**
	 * Chat message
	 */
	chat: string;
	/**
	 * Change ID
	 */
	change_id?: string;
	/**
	 * UUID of chat thread
	 */
	thread_id?: string;
	/**
	 * This comment is an issue
	 * @default false
	 */
	issue?: boolean;
	/**
	 * Path of patch file to comment on
	 */
	diff_path?: string;
	/**
	 * SHA of Diff to comment on
	 */
	diff_sha?: string;
	/**
	 * Range of Diff to comment on (ex: L15 or L15-R50)
	 */
	range?: string;
};

export type SendChatMessageParams = {
	projectId: string;
	branchId: string;
	/**
	 * Chat message
	 */
	chat: string;
	/**
	 * Commit Change ID
	 */
	changeId?: string;
	threadId?: string;
	/**
	 * This comment is an issue
	 * @default false
	 */
	issue?: boolean;
	/**
	 * Path of patch file to comment on
	 */
	diffPath?: string;
	/**
	 * SHA of Diff to comment on
	 */
	diffSha?: string;
	/**
	 * Range of Diff to comment on (ex: L15 or L15-R50)
	 */
	range?: string;
};

export function toApiCreateChatMessageParams(
	params: SendChatMessageParams
): ApiCreateChatMessageParams {
	return {
		branch_id: params.branchId,
		chat: params.chat,
		change_id: params.changeId,
		thread_id: params.threadId,
		issue: params.issue,
		diff_path: params.diffPath,
		diff_sha: params.diffSha,
		range: params.range
	};
}