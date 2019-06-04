import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
var TaskViewComponent = /** @class */ (function () {
    function TaskViewComponent(http, toastr, router, _route, socket, spinner, prevLocation) {
        var _this = this;
        this.http = http;
        this.toastr = toastr;
        this.router = router;
        this._route = _route;
        this.socket = socket;
        this.spinner = spinner;
        this.prevLocation = prevLocation;
        this.allToDoTasks = [];
        this.taskStatus = [];
        this.subTaskStatus = [];
        this.allSubTasks = [];
        this.historyDetails = [];
        this.allStatus = ['open', 'done'];
        this.showSubTask = "hide";
        this.showEditTask = "hide";
        this.showEditSubTask = "hide";
        this.subTaskClick = 0;
        this.editSubTaskClick = 0;
        this.editTaskClick = 0;
        // Show and Hide functions 
        this.showCreateSubTask = function (taskId) {
            if (_this.subTaskClick === 0) {
                _this.showSubTask = "show";
                _this.subTaskClick++;
            }
            else if (_this.subTaskClick % 2 === 0) {
                _this.showSubTask = "show";
                _this.subTaskClick++;
            }
            else {
                _this.showSubTask = "hide";
                _this.subTaskClick++;
            }
            _this.taskIdForSubTask = taskId;
        }; // end show todo create form
        this.showEditSubTaskForm = function (subTaskId) {
            if (_this.editSubTaskClick === 0) {
                _this.showEditSubTask = subTaskId;
                _this.editSubTaskClick++;
            }
            else if (_this.editSubTaskClick % 2 === 0) {
                _this.showEditSubTask = subTaskId;
                _this.editSubTaskClick++;
            }
            else {
                _this.showEditSubTask = "hide";
                _this.editSubTaskClick++;
            }
        }; // end show todo create form
        this.showEditTaskForm = function (taskId) {
            if (_this.editTaskClick === 0) {
                _this.showEditTask = taskId;
                _this.editTaskClick++;
            }
            else if (_this.editTaskClick % 2 === 0) {
                _this.showEditTask = taskId;
                _this.editTaskClick++;
            }
            else {
                _this.showEditTask = "hide";
                _this.editTaskClick++;
            }
        }; // end show edit task form
        // end show and hide functions
        this.logout = function () {
            _this.http.logoutFunction(_this.currentUserId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr("Logout Successful");
                    Cookie.deleteAll();
                    _this.socket.exitSocket();
                    _this.http.deleteUserInfoFromLocalStorage();
                    _this.spinner.show();
                    setTimeout(function () {
                        _this.router.navigate(['/login']);
                        _this.spinner.hide();
                    }, 2000);
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end logout
        this.goBack = function () {
            _this.prevLocation.back();
        }; // end go back
        this.getCurrentToDolist = function () {
            _this.http.getSingleToDoList(_this.currentListId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.currentList = apiResponse.data;
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end get current toDo list
        // Task Related Functions
        this.createNewTask = function () {
            if (!_this.taskName) {
                _this.toastr.warningToastr("Please Provide A Task Name");
            }
            else {
                var data = {
                    listId: _this.currentListId,
                    taskName: _this.taskName
                };
                _this.http.createTask(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr("Task Successfully Created");
                        setTimeout(function () {
                            location.reload();
                        }, 1500);
                    }
                    else {
                        _this.toastr.errorToastr(apiResponse.message);
                    }
                }, function (err) {
                    console.log(err);
                    _this.toastr.errorToastr("Some Error Occured");
                });
            }
        }; // end create Task
        this.getAllTasks = function () {
            _this.http.getAllTask(_this.currentListId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var tasks = _a[_i];
                        _this.allToDoTasks.push(tasks);
                        var statusDetails = {
                            taskId: tasks.taskId,
                            status: tasks.status
                        };
                        _this.taskStatus.push(statusDetails);
                    }
                }
                else {
                    console.log(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end get all tasks
        this.deleteTask = function (listId, taskId) {
            var data = {
                listId: listId,
                taskId: taskId
            };
            _this.http.deleteParticularTask(data).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr("Task Deleted");
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some error Occured");
            });
        }; // end delete task
        this.changeTaskStatus = function (taskId, status) {
            for (var _i = 0, _a = _this.taskStatus; _i < _a.length; _i++) {
                var taskDetails = _a[_i];
                if (taskDetails.taskId === taskId) {
                    if (taskDetails.status === status) {
                        _this.toastr.infoToastr("No Changes Was Done");
                    }
                    else {
                        var data = {
                            status: status,
                            taskId: taskId
                        };
                        _this.http.changeTaskStatus(data).subscribe(function (apiResponse) {
                            if (apiResponse.status === 200) {
                                _this.toastr.successToastr('Status Changed');
                                setTimeout(function () {
                                    location.reload();
                                }, 500);
                            }
                            else {
                                _this.toastr.warningToastr(apiResponse.message);
                            }
                        }, function (err) {
                            console.log(err);
                            _this.toastr.errorToastr("Some error occured");
                        });
                    }
                }
            }
        }; // end change task status
        this.editTask = function (taskId, listId) {
            if (!_this.editTaskName) {
                _this.toastr.warningToastr("Please Provide a Task Name");
            }
            else {
                var data = {
                    listId: listId,
                    taskName: _this.editTaskName,
                    taskId: taskId
                };
                _this.http.editTaskName(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr("Task Name Edited");
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                    else {
                        _this.toastr.warningToastr(apiResponse.message);
                    }
                }, function (err) {
                    console.log(err);
                    _this.toastr.errorToastr("Some error occured");
                });
            }
        }; // end edit task
        //End Task Related Functions
        //Sub Task related Functions
        this.newSubTask = function (taskId) {
            if (!_this.subTaskName) {
                _this.toastr.warningToastr("Please Provide SubTask Name");
            }
            else {
                var data = {
                    taskId: _this.taskIdForSubTask,
                    subTaskName: _this.subTaskName
                };
                _this.http.createSubTask(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr('SubTask Created');
                        setTimeout(function () {
                            location.reload();
                        }, 1500);
                    }
                    else {
                        _this.toastr.warningToastr(apiResponse.message);
                    }
                }, function (err) {
                    console.log(err);
                    _this.toastr.errorToastr("Some error Occured");
                });
            }
        }; // end new subtask
        this.getSubTasks = function () {
            for (var _i = 0, _a = _this.allToDoTasks; _i < _a.length; _i++) {
                var task = _a[_i];
                _this.http.getAllSubTask(task.taskId).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                            var subTask = _a[_i];
                            _this.allSubTasks.push(subTask);
                            var statusDetails = {
                                subTaskId: subTask.subTaskId,
                                status: subTask.status
                            };
                            _this.subTaskStatus.push(statusDetails);
                        }
                    }
                    else {
                        console.log(apiResponse.message);
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        }; // end get Sub task
        this.deleteSubTask = function (subtaskId, taskId) {
            _this.http.deleteSubTask(subtaskId, taskId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    _this.toastr.successToastr('Sub Task Deleted');
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
                else {
                    _this.toastr.warningToastr(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
                _this.toastr.errorToastr("Some Error Occured");
            });
        }; // end delete Sub task
        this.changeSubTaskStatus = function (subTaskId, status, taskId) {
            for (var _i = 0, _a = _this.subTaskStatus; _i < _a.length; _i++) {
                var subTaskDetails = _a[_i];
                if (subTaskDetails.subTaskId === subTaskId) {
                    if (subTaskDetails.status === status) {
                        _this.toastr.infoToastr("No Changes was done");
                    }
                    else {
                        var data = {
                            taskId: taskId,
                            subTaskId: subTaskId,
                            status: status
                        };
                        _this.http.changeSubTaskStatus(data).subscribe(function (apiResponse) {
                            if (apiResponse.status === 200) {
                                _this.toastr.successToastr("Status Changed");
                                setTimeout(function () {
                                    location.reload();
                                }, 1000);
                            }
                            else {
                                _this.toastr.warningToastr(apiResponse.message);
                            }
                        }, function (err) {
                            console.log(err);
                            _this.toastr.errorToastr("Some Error Occured");
                        });
                    }
                }
            }
        }; // end change sub task status
        this.editSubTask = function (subTaskId, taskId) {
            if (!_this.editSubTaskName) {
                _this.toastr.warningToastr("Please provide SubTask name");
            }
            else {
                var data = {
                    taskId: taskId,
                    subTaskId: subTaskId,
                    subTaskName: _this.editSubTaskName
                };
                _this.http.editParticaularSubTask(data).subscribe(function (apiResponse) {
                    if (apiResponse.status === 200) {
                        _this.toastr.successToastr("SubTask Name Edited");
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                    else {
                        _this.toastr.warningToastr(apiResponse.message);
                    }
                }, function (err) {
                    console.log(err);
                    _this.toastr.errorToastr("Some Error Occured");
                });
            }
        }; // end edit SubTask
        // End Sub Task related Functions
        this.getAllHistory = function () {
            _this.http.getAllToDoHistory(_this.currentListId).subscribe(function (apiResponse) {
                if (apiResponse.status === 200) {
                    for (var _i = 0, _a = apiResponse.data; _i < _a.length; _i++) {
                        var history_1 = _a[_i];
                        var historyData = {
                            historyId: history_1.historyId,
                            action: history_1.action,
                        };
                        _this.historyDetails.push(historyData);
                    }
                }
                else {
                    console.log(apiResponse.message);
                }
            }, function (err) {
                console.log(err);
            });
        }; // end get All History
        //function to perform undo operation
        this.undoFunction = function () {
            var currentHistory;
            _this.getAllHistory();
            for (var i = 0; i < _this.historyDetails.length; i++) {
                currentHistory = _this.historyDetails[0];
            }
            if (currentHistory.action === "Sub-Task Status Changed") {
                _this.undoSubTaskChanged(currentHistory.historyId);
            }
        }; // end undo function
        /**
         *
         *
         * Handling Socket related events
         *
         *
         */
        this.undoNewTask = function (historyId) {
            _this.socket.undoNewTask(historyId);
            _this.toastr.successToastr('Undo new task successful');
        }; // end undo function
        this.undoSubTaskChanged = function (historyId) {
            _this.socket.undoSubtaskStatus(historyId);
            _this.toastr.successToastr('Undo Subtask Status Successful');
        }; // end undo sub task status
    }
    TaskViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentListId = this._route.snapshot.paramMap.get('listId');
        this.currentUser = this.http.getUserInfoFromLocalStorage();
        this.currentUserId = this.currentUser.userDetails.userId;
        this.authToken = this.currentUser.authToken;
        this.getCurrentToDolist();
        setTimeout(function () {
            _this.getAllTasks();
            _this.getAllHistory();
        }, 200);
        setTimeout(function () {
            _this.getSubTasks();
        }, 500);
        jQuery.type($('.editSubTask').hide());
        this.socket.verifyUserConfirmation();
    };
    TaskViewComponent = tslib_1.__decorate([
        Component({
            selector: 'app-task-view',
            templateUrl: './task-view.component.html',
            styleUrls: ['./task-view.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpService,
            ToastrManager,
            Router,
            ActivatedRoute,
            SocketService,
            NgxSpinnerService,
            Location])
    ], TaskViewComponent);
    return TaskViewComponent;
}());
export { TaskViewComponent };
//# sourceMappingURL=task-view.component.js.map