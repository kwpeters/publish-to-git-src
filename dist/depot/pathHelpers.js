"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var _ = require("lodash");
var directory_1 = require("./directory");
function reducePathParts(pathParts) {
    return _.reduce(pathParts, function (acc, curPathPart) {
        if (curPathPart instanceof directory_1.Directory) {
            return curPathPart.toString();
        }
        return path.join(acc, curPathPart.toString());
    }, "");
}
exports.reducePathParts = reducePathParts;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXBvdC9wYXRoSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUE2QjtBQUM3QiwwQkFBNEI7QUFDNUIseUNBQXNDO0FBTXRDLHlCQUFnQyxTQUEwQjtJQUV0RCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBVyxFQUFFLFdBQXFCO1FBQzFELElBQUksV0FBVyxZQUFZLHFCQUFTLEVBQ3BDO1lBQ0ksT0FBTyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakM7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNYLENBQUM7QUFURCwwQ0FTQyIsImZpbGUiOiJkZXBvdC9wYXRoSGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHtEaXJlY3Rvcnl9IGZyb20gXCIuL2RpcmVjdG9yeVwiO1xuXG5cbmV4cG9ydCB0eXBlIFBhdGhQYXJ0ID0gRGlyZWN0b3J5IHwgc3RyaW5nO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VQYXRoUGFydHMocGF0aFBhcnRzOiBBcnJheTxQYXRoUGFydD4pOiBzdHJpbmdcbntcbiAgICByZXR1cm4gXy5yZWR1Y2UocGF0aFBhcnRzLCAoYWNjOiBzdHJpbmcsIGN1clBhdGhQYXJ0OiBQYXRoUGFydCk6IHN0cmluZyA9PiB7XG4gICAgICAgIGlmIChjdXJQYXRoUGFydCBpbnN0YW5jZW9mIERpcmVjdG9yeSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGN1clBhdGhQYXJ0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihhY2MsIGN1clBhdGhQYXJ0LnRvU3RyaW5nKCkpO1xuICAgIH0sIFwiXCIpO1xufVxuIl19