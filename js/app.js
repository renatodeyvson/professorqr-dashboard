angular.module('pqrApp', [])
    .controller('classroomController', ($scope, $http, $rootScope) => {

        $scope.getClassroom = () => {
            
            $http.get('http://localhost:3000/classrooms/'+$scope.password).then((response) => {
                
                $rootScope.classroom = response.data[0];

            }, (response) => console.error(response));

        };

        $scope.addClassroom = () => {
            
            $http.post('http://localhost:3000/classrooms', {
                name: $scope.newClassroomName,
                code: $scope.newClassroomCode,
                password: $scope.newClassroomPassword
            }).then((response) => {
                
                console.log(response);

            }, (response) => console.error(response));

        };

    })
    .controller('docController', ($scope, $http, $rootScope) => {

        if($rootScope.classroom) $http.get('http://localhost:3000/docs/'+$rootScope.classroom.code).then((response) => {
                
            $scope.docs = response.data;

        }, (response) => console.error(response));

        $scope.addDoc = () => {

            $http.post('http://localhost:3000/docs', {
                title: $scope.newDocTitle,
                url: $scope.newDocUrl,
                tags: $scope.newDocTags,
                classroom: $rootScope.classroom.code
            }).then((response) => {
                
                $scope.docs.push(response.data);

            }, (response) => console.error(response));

        };

    })
    .controller('scheduleController', ($scope, $http, $rootScope) => {
        
        if($rootScope.classroom) $http.get('http://localhost:3000/schedules/'+$rootScope.classroom.code).then((response) => {
                
            $scope.activities = response.data[0].activities;

        }, (response) => console.error(response));

        $scope.addActivity = () => {

            $scope.activities.push({
                date: $scope.newScheduleDate,
                description: $scope.newScheduleDescription
            });

            $http.put('http://localhost:3000/schedules', {
                old_classroom: $rootScope.classroom.code,
                classroom: $rootScope.classroom.code,
                activities: $scope.activities
            }).then((response) => {}, (response) => console.error(response));

        };

    })
    .controller('studentController', ($scope, $http, $rootScope) => {
        
        if($rootScope.classroom) $http.get('http://localhost:3000/students/'+$rootScope.classroom.code).then((response) => {
                
            $scope.students = response.data;

        }, (response) => console.error(response));

        $scope.addStudent = () => {

            $http.post('http://localhost:3000/students', {
                name: $scope.newStudentName,
                classroom: $rootScope.classroom.code,
                password: $scope.newStudentPassword
            }).then((response) => {

                $scope.students.push(response.data);

            }, (response) => console.error(response));

        };

    });